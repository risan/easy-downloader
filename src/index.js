import url from 'url';

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

    if (auth) {
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

    return !!(data || formData);
  }

  static isMethodAcceptBody(method) {
    return ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
  }
}
