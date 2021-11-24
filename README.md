# NSFW API
API wrapper for [nsfwjs](https://github.com/infinitered/nsfwjs)

## API Endpoint

`POST` /api

### Request
```
{
    "source": "data:image/jpeg;base64,/9j/4AAQ...",
    "url": "https://...",
    "verbose": true,
}
```
* **source**: *String* `REQUIRED`* Base64 image data
* **url**: *String* `REQUIRED`* Image URL
* **verbose**: *boolean* `OPTIONAL`, Include prediction classes and rates. Default: false

*\* either **source** or **url** is required*

## Project setup
```
cd server
npm install
```

### Compiles and hot-reloads for development
```
cd server
npm run dev (For development)
npm run start (For production)
```
