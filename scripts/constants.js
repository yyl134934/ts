const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

// Dev server host and port
const SERVER_HOST = 'localhost';
const SERVER_PORT = 9000;

// Whether to enable bundle package analysis
const shouldOpenAnalyzer = true;
const ANALYZER_HOST = 'localhost';
const ANALYZER_PORT = '8888';

// Resource size limit
const imageInlineSizeLimit = 4 * 1024;

// const THEME = {
//   light: {
//     'primary-color': '#D33A3A',
//     'link-color': '#1DA57A',
//     'border-radius-base': '2px',
//   },
// };

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  shouldOpenAnalyzer,
  ANALYZER_HOST,
  ANALYZER_PORT,
  imageInlineSizeLimit,
};
