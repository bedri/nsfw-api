/**
 * Runs a batch filtering operation for given image addresses and writes results into HTML 
 */

const http = require('http')
const fs = require('fs')

const photos = []

/*
photos.push({url: 'http://localhost:8082/testfiles/0001-08.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0002-09_1200.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0002-13_1200.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0002-18_2400.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0006-01.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0006-02.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0006-03.jpeg'})
photos.push({url: 'http://localhost:8082/testfiles/0009-01_1200.jpeg'})
*/

photos.push({url: 'https://image.shutterstock.com/shutterstock/photos/1893729103/display_1500/stock-photo-sexy-asian-beauty-skincare-woman-smile-to-you-on-white-background-1893729103.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-18_2400.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-02_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-06_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-09_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-06_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210190/0002-13_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/201126/0009-01_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/201126/0009-02_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/201126/0009-03_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/201126/0009-04_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/210179/0020-01_1200.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/171165/0006-02.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/171165/0006-01.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/171165/0006-03.jpg'})
photos.push({url: 'https://cdn.dsmcdn.com/mnresize/1200/1800/ty271/product/media/images/20211214/15/10730460/129151697/1/1_org_zoom.jpg'})
photos.push({url: 'https://cdn.dsmcdn.com/mnresize/1200/1800/ty196/product/media/images/20211013/10/146515001/261978303/1/1_org_zoom.jpg'})
photos.push({url: 'https://cdn.dsmcdn.com/mnresize/1200/1800/ty237/product/media/images/20211111/14/175577139/305943906/1/1_org_zoom.jpg'})
photos.push({url: 'https://cdn.dsmcdn.com/mnresize/1200/1800/ty140/product/media/images/20210629/23/105644800/195312741/1/1_org_zoom.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/190241/0001-08.jpg'})
photos.push({url: 'https://k5x5n5g8.ssl.hwcdn.net/content/190241/0002-01.jpg'})


const request = (url) => {
    return new Promise((resolve, reject) => {
        try {

            const postData = {
                "url": url,
                "verbose":true
            }

            const options = {
                host: 'localhost',
                port: 8082,
                path: '/api',
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                  }
            }
        
        
            const callback = (response) => {
                let jsonStr = ''
            
                response.on('data', function (chunk) {
                    jsonStr += chunk
                })
            
                response.on('end', function () {
                const jsonData = JSON.parse(jsonStr)
                resolve(jsonData)
                })
            }
            
            const httpRequest = http.request(options, callback)
            httpRequest.write(JSON.stringify( postData))
            httpRequest.end()

        } catch (error) {
            console.error(error)
            reject(error)
        }
    })

}


 const process = () => {
    let counter = 1
    new Promise((resolve) => {
        let rows = ''
        for (let index = 0; index < photos.length; index++) {
            const photo = photos[index];
            request(photo.url).then((data) => {
                if (data.error) {
                    console.error(index, photo.url, data);
                } else {
                    const predictions = {}

                    for (let key in Object.keys(data.prediction)) {
                        predictions[data.prediction[key].className.toLowerCase()] = data.prediction[key].probability

                       // console.log(predictions[data.prediction[key].className.toLowerCase()]);
                    }
                    
                    const row = `<tr><td><img src="${photo.url}" width="100" /></td><td>${data.decision}</td><td>${data.dominance.className}</td><td>${predictions['porn']}</td><td>${predictions['sexy']}</td><td>${predictions['neutral']}</td></tr>`
                    rows += row

                    counter ++
                    if (photos.length === counter) {
                        resolve(rows)
                    }

                    console.log(counter, photos.length)
                }
                
                
            })
            
        }
    }).then((rows) => {

        let html =`<table><thead><tr><th></th><th>DECISION</th><th>DOMINANCE</th><th>PORN</th><th>SEXY</th><th>NEUTRAL</th></tr></thead><tbody>${rows}</tbody></table>`
        html += '<style>table{border:2px solid #FFF;width:100%;text-align:center;border-collapse:collapse}table td,table th{border:1px solid #FFF;padding:3px 4px}table tbody td{font-size:13px}table td:nth-child(even){background:#EBEBEB}table thead{background:#FFF;border-bottom:4px solid #333}table thead th{font-size:15px;font-weight:700;color:#333;text-align:center;border-left:2px solid #333}table thead th:first-child{border-left:none}table tfoot{font-size:14px;font-weight:700;color:#333;border-top:4px solid #333}table tfoot td{font-size:14px}</style>'
        //const filename = './test-result/web_model-graph-17mb.html'
        //const filename = './test-result/web_model_quantized-graph-4mb.html'
        //const filename = './test-result/inception-299x-90mb.html'
        //const filename = './test-result/n0.8-p0.09.html'
        const filename = './test-result/p0.000999.html'
        
        fs.writeFile(filename, html, null, () => {
            console.log('done', filename)
        })
    })
   
}

process()