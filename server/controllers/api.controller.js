const { ERROR_CODE } = require("../config/constants")
const { logger } = require("../util/logger.util")
const { download } = require("../util/http.util")
const { nsfwWrapper } = require("../nsfw")
const { profiles } = require("../nsfw-profiles")

/**
 * Check image file for NSFW
 */
const check = async (request, response) => {
  const responseData = {}
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
          
          responseData.decision = profiles.default(predictions) 
            ? "not.safe"
            : "safe"

        } 
        else {
          responseData.error = ERROR_CODE.UNEXPECTED
        }
      })
      .catch((error) => {
        logger.error(error)
        responseData.error = ERROR_CODE.UNEXPECTED_IMAGE_DATA
      })
  } 
  else {
    responseData.error = ERROR_CODE.CANNOT_READ_IMAGE_DATA
  }
  response.json(responseData)
}

module.exports = {
  check,
}
