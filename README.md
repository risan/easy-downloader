# Easy Downloader

[![Latest Stable Version](https://img.shields.io/npm/v/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)
[![Node Version](https://img.shields.io/node/v/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)
[![Build Status](https://travis-ci.org/risan/easy-downloader.svg?branch=master)](https://travis-ci.org/risan/easy-downloader)
[![Test Coverage](https://api.codeclimate.com/v1/badges/216528b54c5d591441b8/test_coverage)](https://codeclimate.com/github/risan/easy-downloader/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/216528b54c5d591441b8/maintainability)](https://codeclimate.com/github/risan/easy-downloader/maintainability)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/risan/easy-downloader)
[![License](https://img.shields.io/npm/l/easy-downloader.svg)](https://www.npmjs.com/package/easy-downloader)

A promised based library for downloading file.

## Install

```bash
$ npm install easy-downloader
```

## Usage

```js
const EasyDownloader = require('easy-downloader');

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

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Tanzil.net](http://tanzil.net) or any of its affiliates or subsidiaries. This is an independent and unofficial library.

By downloading the Quran text from [Tanzil.net](http://tanzil.net) you agree to Tanzil's terms of use:

```
#  - This quran text is distributed under the terms of a
#    Creative Commons Attribution 3.0 License.
#
#  - Permission is granted to copy and distribute verbatim copies
#    of this text, but CHANGING IT IS NOT ALLOWED.
#
#  - This quran text can be used in any website or application,
#    provided its source (Tanzil.net) is clearly indicated, and
#    a link is made to http://tanzil.net to enable users to keep
#    track of changes.
#
#  - This copyright notice shall be included in all verbatim copies
#    of the text, and shall be reproduced appropriately in all files
#    derived from or containing substantial portion of this text.
```
