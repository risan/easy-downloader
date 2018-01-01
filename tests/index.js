import EasyDownloader from '../src';

test('can get request options', () => {
  expect(
    EasyDownloader.getRequestOptions({
      uri: 'https://example.com/foo/bar?baz=qux',
      method: 'POST',
      data: { foo: 'bar' },
      headers: { baz: 'qux' },
      auth: {
        username: 'john',
        password: 'secret'
      }
    })
  ).toEqual({
    protocol: 'https:',
    hostname: 'example.com',
    port: 433,
    path: '/foo/bar?baz=qux',
    method: 'POST',
    headers: {
      'Content-Length': 13,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      baz: 'qux'
    },
    auth: 'john:secret'
  });
});

test('can check if body should be written', () => {
  expect(
    EasyDownloader.shouldWriteBody({ method: 'POST', data: { foo: 'bar' } })
  ).toBe(true);

  expect(
    EasyDownloader.shouldWriteBody({ method: 'POST', formData: { foo: 'bar' } })
  ).toBe(true);

  expect(EasyDownloader.shouldWriteBody({ method: 'POST' })).toBe(false);

  expect(
    EasyDownloader.shouldWriteBody({ method: 'GET', data: { foo: 'bar' } })
  ).toBe(false);
});

test('can check if HTTP method accept the body', () => {
  expect(EasyDownloader.isMethodAcceptBody('POST')).toBe(true);
  expect(EasyDownloader.isMethodAcceptBody('PUT')).toBe(true);
  expect(EasyDownloader.isMethodAcceptBody('PATCH')).toBe(true);
  expect(EasyDownloader.isMethodAcceptBody('GET')).toBe(false);
  expect(EasyDownloader.isMethodAcceptBody('DELETE')).toBe(false);
});

test('can get content type', () => {
  expect(EasyDownloader.getContentType({ data: { foo: 'bar' } })).toBe(
    'application/x-www-form-urlencoded;charset=utf-8'
  );
  expect(EasyDownloader.getContentType({ formData: { foo: 'bar' } })).toBe(
    'application/json;charset=utf-8'
  );
  expect(EasyDownloader.getContentType()).toBeNull();
});

test('can stringify body', () => {
  expect(EasyDownloader.stringifyBody({ data: { foo: 'bar' } })).toBe(
    '{"foo":"bar"}'
  );
  expect(EasyDownloader.stringifyBody({ formData: { foo: 'bar' } })).toBe(
    'foo=bar'
  );
  expect(EasyDownloader.stringifyBody()).toBeNull();
});

test('can check if it is non-empty object', () => {
  expect(EasyDownloader.isNonEmptyObject({ foo: 'bar' })).toBe(true);
  expect(EasyDownloader.isNonEmptyObject({})).toBe(false);
  expect(EasyDownloader.isNonEmptyObject('foo')).toBe(false);
  expect(EasyDownloader.isNonEmptyObject(['foo'])).toBe(false);
});
