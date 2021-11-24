const {LOG_FOLDER_PATH} = require('./constants')
const fs = require('fs')
const {nsfwWrapper} = require('../nsfw')

const initialConfigs = () => {

    // create application log folder
    if (! fs.existsSync(LOG_FOLDER_PATH)) {
        fs.mkdirSync(LOG_FOLDER_PATH, { recursive: true })
    }

    nsfwWrapper.loadModel()
    
}

module.exports = {
    initialConfigs
}