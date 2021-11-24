const https = require('https')
const { logger } = require('./logger.util')
const download = (url) => {
	return new Promise((resolve, reject) => {
	https.get(url, (res) => {
		const data = []
		res.on('data', (chunk) => {
		  data.push(chunk)
		}).on('end', () => {
		  let buffer = Buffer.concat(data)
		  resolve(buffer)
		})
	  }).on('error', (error) => {
		logger.error(error)
	  })
	})
}

module.exports = {
    download
}