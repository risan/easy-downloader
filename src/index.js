import url from 'url';
import qs from 'querystring';

export default class EasyDownloader {
  static getRequestOptions({ uri, method = 'GET', headers = {}, auth = null }) {
    const parsedUri = url.parse(uri);

    const options = {
      protocol: parsedUri.protocol || 'http:',
      hostname: parsedUri.hostname,
      port: parsedUri.port || (parsedUri.protocol === 'https:' ? 433 : 80),
      path: parsedUri.path || '/',
      method: method.toUpperCase(),
      headers
    };

    if (EasyDownloader.isNonEmptyObject(auth)) {
      const username = auth.username || '';
      const password = auth.password || '';
      options.auth = `${username}:${password}`;
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

  static stringifyBody({ data, formData }) {
    if (EasyDownloader.isNonEmptyObject(data)) {
      return JSON.stringify(data);
    }

    if (EasyDownloader.isNonEmptyObject(formData)) {
      return qs.stringify(formData);
    }

    return null;
  }

  static isNonEmptyObject(obj) {
    return (
      typeof obj === 'object' &&
      Object.keys(obj).length > 0 &&
      obj.constructor === Object
    );
  }
}
