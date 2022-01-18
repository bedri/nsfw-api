
const { logger } = require("./util/logger.util")
const nsfw = require("nsfwjs")
const jpeg = require('jpeg-js')
const tf = require('@tensorflow/tfjs')

const nsfwWrapper = {

  loadingInProgress: false,

  async loadModel() {
    return new Promise(async (resolve, reject) => {
      if (!!this.model) {
        logger.basic("Already armed", "NSFW model")
        resolve(this.model)
      } 
      else if (this.loadingInProgress) {
        logger.basic("Still loading...", "NSFW model")
        reject("Still loading...")
      }
      else {
        this.loadingInProgress = true
        this.loadStartedAt = + new Date()
  
        logger.basic("Loading", "NSFW model")
        //this.model = await nsfw.load('http://cpctn.club:7070/nsfw-api/model/web_model_quantized-graph-4mb/', {type: 'graph'})
        this.model = await nsfw.load('http://cpctn.club:7070/nsfw-api/model/web_model-graph-17mb/', {type: 'graph'})
        //this.model = await nsfw.load('http://localhost:8082/model/web_model-graph-17mb/', {type: 'graph'})
        
        logger.basic("Loaded", `NSFW model (took ${((new Date() - this.loadStartedAt) / 1000 / 60).toFixed(2)} sec.)`)
        this.loadingInProgress = false
        resolve(this.model)
      }
    });
    

  },

  async getModel() {
    if (!this.model && this.loadingInProgress) {
      return Promise.reject("model.loading.in.progress")
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
    return new Promise(async (resolve, reject) => {
      await this.getModel().then(async (model) => {
        const predictions = await model.classify(tensor3d)

        tensor3d.dispose()
        resolve(predictions)
      }).catch((error) => {
        reject(error)
      })
      
    })
    
  },
}

module.exports = {
  nsfwWrapper,
}
