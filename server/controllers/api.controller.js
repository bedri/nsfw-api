const { ERROR_CODE } = require("../config/constants")
const { logger } = require("../util/logger.util")
const { download } = require("../util/http.util")
const { nsfwWrapper } = require("../nsfw")
const { PredictionProfiler } = require("../prediction-profiler")

/**
 * Check image file for NSFW
 */
const check = async (request, response) => {
  let responseStatusCode = 200
  try {
    const responseData = {}
    const profiler = new PredictionProfiler(request.body.profile)
    let imageData = null
    if (request.body.url) {
      imageData = await download(request.body.url)
    } 
    else if (request.body.source) {
      let source = request.body.source
      if (source.startsWith("data:image")) {
        source = source.split(",")[1]
      }
      imageData = Buffer.from(source, "base64")
    } 
    else {
      responseData.error = ERROR_CODE.INVALID_REQUEST_PARAMETERS
    }

    if (imageData) {
      await nsfwWrapper
        .predict(imageData)
        .then((predictions) => {
          if (predictions) {
            if (request.body.verbose) {
              responseData.prediction = predictions
              responseData.dominance = predictions.reduce((one, another) => {
                  return one.probability > another.probability ? one : another
                })
            }
            
            responseData.profile = profiler.profileName
            responseData.decision = profiler.apply(predictions)
              ? "not.safe"
              : "safe"

          } 
          else {
            responseData.error = ERROR_CODE.UNEXPECTED
            responseStatusCode = 500
          }
        })
        .catch((error) => {
          logger.error(error)
          if (error && error === "model.loading.in.progress") {
            responseData.error = "Application warming up, please try again later."
            responseStatusCode = 503
            response.set("retry-after", 5)
          } else {
            responseData.error = error
            responseStatusCode = 400
          }
          
        })
    } 
    else {
      responseData.error = ERROR_CODE.CANNOT_READ_IMAGE_DATA
      responseStatusCode = 400
    }
    response.status(responseStatusCode).json(responseData)
  } catch (err) {
    logger.error(err)
    response.status(500).json({error: "internal.error"})
  }
}

module.exports = {
  check,
}
