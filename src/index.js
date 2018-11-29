const sendRequest = require("send-request");
const writeToFile = require("write-to-file");

/**
 * Download file.
 *
 * @param {String} url
 * @param {String} destination
 * @param {Object} options
 * @return {Promise}
 */
const easyDownloader = async (url, destination, options = {}) => {
  const { body } = await sendRequest(url, { ...options, encoding: null });

  return writeToFile(destination, body);
};

module.exports = easyDownloader;
