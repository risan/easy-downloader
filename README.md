# Easy Downloader

[![Latest Stable Version](https://img.shields.io/npm/v/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)
[![Build Status](https://travis-ci.org/risan/easy-downloader.svg?branch=master)](https://travis-ci.org/risan/easy-downloader)
[![Node Version](https://img.shields.io/node/v/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)
[![Test Coverage](https://api.codeclimate.com/v1/badges/216528b54c5d591441b8/test_coverage)](https://codeclimate.com/github/risan/easy-downloader/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/216528b54c5d591441b8/maintainability)](https://codeclimate.com/github/risan/easy-downloader/maintainability)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/risan/easy-downloader)
[![License](https://img.shields.io/npm/l/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)

A package for downloading file.

## Install

```bash
$ npm install easy-downloader
```

## Usage

```js
import EasyDownloader from 'easy-downloader';

EasyDownloader.download({ uri: 'httpbin.org/image/png', destination: 'test.png' })
  .then(destination => console.log(`File is downloaded to: ${destination}`))
  .catch(e => console.error(e.message));
```

## API

```js
EasyDownloader.download({
    uri, destination,
    [method, encoding, data, formData, headers, auth]
});
```

#### Required Parameters:
- **`uri`** (*`String`*): The URI of the file that you want to download.
- **`destination`** (*`String`*): The path where your downloaded file will be written.

#### Optional Parameters:
- **`method`** (*`String`*): The HTTP request method, default to `GET`.
- **`encoding`** (*`String`*): Character encoding that will be used to interpret the response from the target URI. Check the Buffer [documentation](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) for more information.
- **`data`** (*`Object`*): Request body that needs to be sent as JSON formatted data.
- **`formData`** (*`Object`*): Request body that needs to be sent in `x-www-form-urlencoded` format.
- **`headers`** (*`Object`*): Request headers that need to sent.
- **`auth`** (*`Object`*): HTTP basic authentication credentials, you have to pass the `username` and `password` properties like so: `{ username: 'john', password: 'secret' }`.

Note that `data` and `formData` are only applicable for request methods 'PUT', 'POST', and 'PATCH'. Also the `Content-Type` and `Content-Length` headers will be automatically provided for you.

#### Example

```js
EasyDownloader.download({
    uri: 'http://example.com/download',
    destination: 'test.txt',
    method: 'POST',
    encoding: 'utf8',
    formData: {
      foo: 'bar'
    },
    headers: {
      'X-Powered-By': 'Easy Downloader'
    },
    auth: {
      username: 'john',
      password: 'secret'
    }
  })
  .then(destination => console.log(`File is downloaded to: ${destination}`))
  .catch(e => console.error(e.message));
```

## License

MIT © [Risan Bagja Pradana](https://risan.io)
