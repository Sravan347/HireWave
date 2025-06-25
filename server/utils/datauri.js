

// // import DataUriParser from "datauri/parser.js"
// const DataUriParser = require("datauri/parser.js").default;

// const path = require("path");

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// module.exports = getDataUri;

const DataUriParser = require('datauri/parser'); // ✅ No `.default`
const path = require('path');

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
