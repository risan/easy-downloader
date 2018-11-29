/* global afterAll:false, afterEach:false, beforeAll:false, expect:false, test:false */
const fs = require("fs");
const p = require("path");
const nock = require("nock");

const easyDownload = require("../src");

const BASE_URL = "https://example.com";
const BASE_DIR = `${__dirname}/fixtures`;

const urlFor = (path = "/") => `${BASE_URL}${path}`;
const filePath = (path = "/") => p.join(BASE_DIR, path);

const rmdir = path => {
  try {
    fs.rmdirSync(filePath(path));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const unlink = path => {
  try {
    fs.unlinkSync(filePath(path));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

beforeAll(() => fs.mkdirSync(BASE_DIR));

afterAll(() => fs.rmdirSync(BASE_DIR));

afterEach(() => {
  unlink("test.txt");
  unlink("test.html");
  unlink("test.png");

  unlink("foo/bar/test.txt");
  rmdir("foo/bar");
  rmdir("foo");
});

const mockServer = ({
  url = BASE_URL,
  path = "/",
  status = 200,
  body,
  headers
}) =>
  nock(url)
    .get(path)
    .reply(status, body, headers);

test("it can download a text file", async () => {
  const body = "Hello World";

  const scope = mockServer({
    path: "/test.txt",
    body,
    headers: {
      "content-type": "text/plain"
    }
  });

  const file = filePath("test.txt");

  expect(fs.existsSync(file)).toBe(false);

  await easyDownload(urlFor("/test.txt"), file);

  expect(scope.isDone()).toBe(true);
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.readFileSync(file, "utf8")).toBe(body);
});

test("it can download an html file", async () => {
  const body = "<h1>Hello World</h1>";

  const scope = mockServer({
    path: "/test.html",
    body,
    headers: {
      "content-type": "text/html"
    }
  });

  const file = filePath("test.html");

  expect(fs.existsSync(file)).toBe(false);

  await easyDownload(urlFor("/test.html"), file);

  expect(scope.isDone()).toBe(true);
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.readFileSync(file, "utf8")).toBe(body);
});

test("it can download an image file", async () => {
  const body = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==",
    "base64"
  );

  const scope = mockServer({
    path: "/test.png",
    body,
    headers: {
      "content-type": "image/png"
    }
  });

  const file = filePath("test.png");

  expect(fs.existsSync(file)).toBe(false);

  await easyDownload(urlFor("/test.png"), file);

  expect(scope.isDone()).toBe(true);
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.readFileSync(file)).toEqual(body);
});

test("it can download file and automatically create its parent directories", async () => {
  const body = "Hello World";

  const scope = mockServer({
    path: "/test.txt",
    body,
    headers: {
      "content-type": "text/plain"
    }
  });

  const file = filePath("foo/bar/test.txt");

  expect(fs.existsSync(file)).toBe(false);

  await easyDownload(urlFor("/test.txt"), file);

  expect(scope.isDone()).toBe(true);
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.readFileSync(file, "utf8")).toBe(body);
});

test("it throws error if status code >= 400", async () => {
  expect.assertions(4);

  const scope = mockServer({
    path: "/test.txt",
    status: 400
  });

  const file = filePath("test.txt");

  expect(fs.existsSync(file)).toBe(false);

  try {
    await easyDownload(urlFor("/test.txt"), file);
  } catch (error) {
    expect(error.response.statusCode).toBe(400);
  }

  expect(scope.isDone()).toBe(true);
  expect(fs.existsSync(file)).toBe(false);
});
