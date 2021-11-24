var express = require('express')
var cookieParser = require('cookie-parser')
var morgan = require('morgan')

var apiRouter = require('./routes/api')

var app = express()
var cors = require('cors')
const fs = require('fs')
const {APP_SERVICE_NAME, LOG_FOLDER_PATH} = require('./config/constants')

//app.use(cors({origin: 'http://localhost:8081'},{origin: 'http://localhost:8080'}, {origin: 'http://hotornot.nxber.com/'}))
app.use(cors())
app.options('*', cors())

// setup the logger and create a write stream (in append mode)
app.use(morgan('dev'))
app.use(morgan('common', { 
    stream: fs.createWriteStream( `${LOG_FOLDER_PATH}/${APP_SERVICE_NAME}-${new Date().toISOString().split('T')[0]}.access.log` , { flags: 'a' }),
    interval: '1d'
    })
)


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public', {
    etag: false
}))

// keep order, '/' is at the end
app.use('/api', apiRouter)


module.exports = app
