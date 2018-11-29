# Easy Download

[![Build Status](https://flat.badgen.net/travis/risan/download-it)](https://travis-ci.org/risan/download-it)
[![Test Coverage](https://flat.badgen.net/codeclimate/coverage/risan/download-it)](https://codeclimate.com/github/risan/download-it)
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/risan/download-it)](https://codeclimate.com/github/risan/download-it)
[![Latest Stable Version](https://flat.badgen.net/npm/v/download-it)](https://www.npmjs.com/package/download-it)
[![Node Version](https://flat.badgen.net/npm/node/download-it)](https://www.npmjs.com/package/download-it)
[![Code Style: Prettier](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)
[![License](https://flat.badgen.net/npm/license/download-it)](https://github.com/risan/send-request/blob/master/LICENSE)

Download a file from remote URL easily.

## Install

```bash
$ npm install download-it

# Or if you use Yarn
$ yarn add download-it
```

## Quick Start

```js
const downloadIt = require("download-it");

(async () => {
  try {
    await downloadIt("https://httpbin.org/image/jpeg", "foo/bar/baz.jpg");
  } catch (error) {
    console.error(error.message);
  }
})();
```

The `foo/bar` directory will be created automatically if it does not exist.

## API

```js
downloadIt(url, destination, [options]);
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

## License

MIT © [Risan Bagja Pradana](https://bagja.net)
