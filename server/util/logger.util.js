// const {APP_SERVICE_NAME, LOG_FOLDER_PATH} = require('../config/constants')

const logger = {
    basic: (label, value) => {
        if (! value) {
            console.log('\x1b[5m', label, '\x1b[0m')
        }
        else {
            console.log(label, '\x1b[1m', value, '\x1b[0m')
        }
    },
    info: (message) => {
        console.log(message)
    },
    warn: (message) => {
        console.warn(message)
    },
    error: (message) => {
        console.error(message)
    }
}
module.exports = {
    logger
}