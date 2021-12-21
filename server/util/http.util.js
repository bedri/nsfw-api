const https = require('https')
const http = require('http')
const { logger } = require('./logger.util')
const download = (url) => {
	return new Promise((resolve, reject) => {
		
		(url.startsWith('https') ? https : http).get(url, (res) => {
		const data = []
		res.on('data', (chunk) => {
		  data.push(chunk)
		}).on('end', () => {
		  let buffer = Buffer.concat(data)
		  resolve(buffer)
		})
	  }).on('error', (error) => {
		logger.info(`Failed to download ${url}`)
		logger.error(error)
	  })
	})
}

module.exports = {
    download
}