const fs = require('fs');
const path = require('path');

// 簡單的自定義 logger
const logFilePath = path.join(__dirname, '../../../logs/query_log.txt');

function info(message) {
    const logMsg = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    console.log(logMsg.trim());
    fs.appendFileSync(logFilePath, logMsg);
}

function error(message) {
    const logMsg = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    console.error(logMsg.trim());
    fs.appendFileSync(logFilePath, logMsg);
}

module.exports = {
    info,
    error
};
