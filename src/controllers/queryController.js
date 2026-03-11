const retryEngine = require('../core/retryEngine');

/**
 * 處理自然語言查詢請求
 * @param {express.Request} req 請求物件
 * @param {express.Response} res 回應物件
 */
async function handleQuery(req, res) {
    try {
        const { question, database } = req.body;

        // STEP_01 驗證必填參數
        if (!question || !database) {
            return res.status(400).json({
                status: 'error',
                error: { code: 'MISSING_PARAMS', message: 'question and database fields are required' }
            });
        }

        // STEP_02 透過 Retry Engine（內含 AI 產生、Query Guard 檢查與 Query Runner 執行）進行查詢
        const result = await retryEngine.executeWithRetry(question, database);

        // STEP_03 成功回傳結果
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        // STEP_04 攔截 Guard 拒絕或是各種錯誤
        const statusCode = error.code === 'GUARD_REJECTED' ? 400 : 500;
        return res.status(statusCode).json({
            status: 'error',
            error: {
                code: error.code || 'INTERNAL_ERROR',
                message: error.message
            }
        });
    }
}

module.exports = {
    handleQuery
};
