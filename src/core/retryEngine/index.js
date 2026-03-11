const aiGenerator = require('../aiGenerator');
const queryGuard = require('../queryGuard');
const { executeQuery } = require('../../infrastructure/database/mongoRunner');
const logger = require('../../utils/logger');

const MAX_RETRIES = 3;

/**
 * 執行具有自癒重試機制的查詢流
 * @param {String} question 
 * @param {String} database 
 */
async function executeWithRetry(question, database) {
    let attempt = 0;
    let lastError = null;

    // STEP_01 重試迴圈
    while (attempt <= MAX_RETRIES) {
        try {
            logger.info(`Attempt ${attempt}: Generating query for question: ${question}`);

            // 1. AI 產生查詢 (傳入上一次的錯誤幫助修正)
            const rawQuery = await aiGenerator.generateQuery(question, lastError ? lastError.message : null);
            logger.info(`Generated Query: ${rawQuery}`);

            // 2. Query Guard 檢查
            const safeQueryObj = queryGuard.validateQuery(rawQuery);

            // 3. Query Runner 執行
            const result = await executeQuery(safeQueryObj);

            // STEP_02 若成功，即回傳結果
            logger.info(`Attempt ${attempt} SUCCESS.`);
            return {
                generated_query: rawQuery,
                result,
                retries: attempt
            };

        } catch (err) {
            attempt++;
            lastError = err;
            logger.error(`Attempt ${attempt - 1} FAILED: ${err.message}`);

            // 如果是 Guard 拒絕這類危險操作，直接中止重試 (不給 AI 亂 Try 機會)
            if (err.code === 'GUARD_REJECTED' || attempt > MAX_RETRIES) {
                break;
            }
        }
    }

    // STEP_03 超出重試次數或觸發安全機制
    const finalError = new Error(`Failed after ${attempt - 1} retries. Last Error: ${lastError.message}`);
    finalError.code = lastError.code || 'AI_GENERATION_FAILED';
    throw finalError;
}

module.exports = {
    executeWithRetry
};
