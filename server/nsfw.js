
const { logger } = require("./util/logger.util")
const nsfw = require("nsfwjs")
const jpeg = require('jpeg-js')
const tf = require('@tensorflow/tfjs')

const nsfwWrapper = {
  async loadModel() {
    logger.basic("Loading", "NSFW model")
    //this.model = await nsfw.load('http://cpctn.club:7070/nsfw-api/model/web_model_quantized-graph-4mb/', {type: 'graph'})
    this.model = await nsfw.load('http://cpctn.club:7070/nsfw-api/model/web_model-graph-17mb/', {type: 'graph'})
    //this.model = await nsfw.load('http://cpctn.club:7070/nsfw-api/model/inception-299x-90mb/', {size: 299})
    
    logger.basic("Loaded", "NSFW model")
  },

  async getModel() {
    if (!this.model) {
      await this.loadModel()
    }
    return this.model
  },

  async predict(imageData) {
    const arrayBuffer = new ArrayBuffer(imageData.length)

    for (let i = 0; i < imageData.length; i++) {
      arrayBuffer[i] = imageData[i]
    }

    const image = await jpeg.decode(imageData)
    const numberOfChannels = 3
    const numberOfPixels = image.width * image.height
    const values = new Int32Array(numberOfPixels * numberOfChannels)

    for (let i = 0; i < numberOfPixels; i++) {
      for (let c = 0; c < numberOfChannels; ++c) {
        values[i * numberOfChannels + c] = image.data[i * 4 + c]
      }
    }
    const tensor3d = tf.tensor3d(
      values,
      [image.height, image.width, numberOfChannels],
      "int32"
    )
    const model = await this.getModel()
    const predictions = await model.classify(tensor3d)

    tensor3d.dispose()
    return Promise.resolve(predictions)
  },
}

module.exports = {
  nsfwWrapper,
}
