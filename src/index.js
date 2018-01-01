import fs from 'fs';
import http from 'http';
import https from 'https';
import qs from 'querystring';
import url from 'url';

export default class EasyDownloader {
  static download({
    uri,
    destination,
    method = 'GET',
    encoding,
    data,
    formData,
    headers = {},
    auth
  }) {
    return new Promise((resolve, reject) => {
      const destinationFile = fs.createWriteStream(destination);

      const options = EasyDownloader.getRequestOptions({
        uri,
        method,
        data,
        formData,
        headers,
        auth
      });

      const client = options.protocol === 'https:' ? https : http;

      const request = client.request(options, response => {
        if (encoding) {
          response.setEncoding(encoding);
        }

        response.pipe(destinationFile);

        destinationFile.on('error', err => {
          reject(err);
        });

        destinationFile.on('finish', () => {
          destinationFile.close(err => {
            if (err) {
              return reject(err);
            }

            return resolve(destination);
          });
        });
      });

      if (EasyDownloader.shouldWriteBody({ method, data, formData })) {
        request.write(EasyDownloader.stringifyBody({ data, formData }));
      }

      request.end();

      request.on('error', err => {
        reject(err);
      });
    });
  }

  static getRequestOptions({
    uri,
    method = 'GET',
    data,
    formData,
    headers = {},
    auth
  }) {
    const parsedUri = url.parse(uri);

    const options = {
      protocol: parsedUri.protocol || 'http:',
      hostname: parsedUri.hostname,
      path: parsedUri.path || '/',
      method: method.toUpperCase(),
      headers
    };

    if (parsedUri.port) {
      options.port = parseInt(parsedUri.port);
    }

    if (EasyDownloader.isNonEmptyObject(auth)) {
      const username = auth.username || '';
      const password = auth.password || '';
      options.auth = `${username}:${password}`;
    }

    if (EasyDownloader.shouldWriteBody({ method, data, formData })) {
      if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = EasyDownloader.getContentType({
          data,
          formData
        });
      }

      if (!options.headers['Content-Length']) {
        options.headers['Content-Length'] = Buffer.byteLength(
          EasyDownloader.stringifyBody({ data, formData })
        );
      }
    }

    return options;
  }

  static shouldWriteBody({ method, data, formData }) {
    if (!EasyDownloader.isMethodAcceptBody(method)) {
      return false;
    }

    return (
      EasyDownloader.isNonEmptyObject(data) ||
      EasyDownloader.isNonEmptyObject(formData)
    );
  }

  static isMethodAcceptBody(method) {
    return ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
  }

  static getContentType({ data, formData } = {}) {
    if (EasyDownloader.isNonEmptyObject(data)) {
      return 'application/x-www-form-urlencoded;charset=utf-8';
    }

    if (EasyDownloader.isNonEmptyObject(formData)) {
      return 'application/json;charset=utf-8';
    }

    return null;
  }

  static stringifyBody({ data, formData } = {}) {
    if (EasyDownloader.isNonEmptyObject(data)) {
      return JSON.stringify(data);
    }

    if (EasyDownloader.isNonEmptyObject(formData)) {
      return qs.stringify(formData);
    }

    return null;
  }

  static isNonEmptyObject(obj) {
    if (typeof obj !== 'object') {
      return false;

    }

    return Object.keys(obj).length > 0 && obj.constructor === Object;
  }
}
