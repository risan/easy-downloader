const sendRequest = require("send-request");
const writeToFile = require("write-to-file");

/**
 * Download file.
 *
 * @param {String} options.url
 * @param {String} options.destination
 * @param {String} options.encoding
 * @param {Object} options.options
 * @return {Promise}
 */
const easyDownload = async ({ url, destination, encoding, ...options }) => {
  const { body } = await sendRequest(url, { encoding, ...options });

  return writeToFile(destination, body, { encoding });
};

module.exports = easyDownload;
