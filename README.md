# Easy Download

[![Build Status](https://badgen.net/travis/risan/easy-downloader)](https://travis-ci.org/risan/easy-downloader)
[![Test Covarage](https://badgen.net/codecov/c/github/risan/easy-downloader)](https://codecov.io/gh/risan/easy-downloader)
[![Greenkeeper](https://badges.greenkeeper.io/risan/easy-downloader.svg)](https://greenkeeper.io)
[![Latest Version](https://badgen.net/npm/v/easy-downloader)](https://www.npmjs.com/package/easy-downloader)

Download file from remote URL easily.

## Installation

```bash
$ npm install easy-downloader
```

## Usage

```js
const easyDownload = require("easy-downloader");

(async () => {
  try {
    await easyDownload("https://httpbin.org/image/jpeg", "foo/bar/baz.jpg");
  } catch (error) {
    console.error(error.message);
  }
})();
```

The `foo/bar` directory will be created automatically if it does not exist.

## API

```js
easyDownload(url, destination, [options]);
```

### Parameters

* `url` (`String`): The file URL to download.
* `destination` (`String`): The path to save the downloaded file.
* `options` (optional `Object`): The HTTP request configuration
  * `method` (`String`): The HTTP method to use, default to `GET`.
  * `headers` (`Object`): The request headers to send.
  * `auth.username` (`String`): The username for HTTP basic auth.
  * `auth.password` (`String`): The password for HTTP basic auth.
  * `body` (`Object|FormData`): The request body to send. It can be a plain JavaScript object or an instance of [`FormData`](https://github.com/form-data/form-data).
  * `json` (`Boolean`): Set to `true` if you want to send the request body with `application/json` content type. Default to `false`, which means that the request body will be sent as `application/x-www-form-urlencoded`. Note that you can still override the content type using the `headers` option.

## Related

* [send-request](https://github.com/risan/send-request): Lightweight HTTP client for Node.

## License

[MIT](https://github.com/risan/easy-downloader/blob/master/LICENSE) © [Risan Bagja Pradana](https://bagja.net)
