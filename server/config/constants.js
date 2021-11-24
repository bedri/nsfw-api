const path = require('path')

const APP_NAME = "NSFW API"

const APP_SERVICE_NAME = "nsfw-api"

const SERVER_PORT = '8082'

const BASE_URL = 'http://' + (process.env.HOSTNAME || 'localhost') + (process.env.DEV ? (':' + (process.env.PORT || SERVER_PORT)) : '')

const LOG_FOLDER_PATH = path.resolve('./log') // `/var/log/${APP_SERVICE_NAME}`

const ERROR_CODE = {
    UNEXPECTED: 'error.unexpected',
    INVALID_REQUEST_PARAMETERS: 'error.invalid.request.parameters',
    ITEM_NOT_FOUND: 'error.item.not.found',
    CANNOT_READ_IMAGE_DATA: 'error.cannot.image.data',
    UNEXPECTED_IMAGE_DATA: 'error.unexpected.image.data',
}

module.exports = {
    APP_NAME,
    APP_SERVICE_NAME,
    SERVER_PORT,
    BASE_URL,
    LOG_FOLDER_PATH,
    ERROR_CODE
}
