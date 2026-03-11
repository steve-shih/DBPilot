/**
 * 核心安全層：攔截非法操作，確保查詢是只讀的
 * @param {String} rawQuery AI 產生的原始查詢字串
 */
function validateQuery(rawQuery) {
    // STEP_01 拒絕寫入與破壞性操作關鍵字
    const forbiddenKeywords = ['delete', 'remove', 'drop', 'insert', 'update', 'replace', 'set'];
    const lowerQuery = rawQuery.toLowerCase();

    for (const keyword of forbiddenKeywords) {
        // 簡單的關鍵字比對 (防呆機制)
        if (lowerQuery.includes(keyword)) {
            const err = new Error(`Query contains forbidden operations. Keyword '${keyword}' is not allowed.`);
            err.code = 'GUARD_REJECTED';
            throw err;
        }
    }

    // STEP_02 (模擬) 將查詢字串解析為物件，並強制加上 Limit 限制
    // 實務上這裡需要更嚴謹的 AST 語法樹解析。MVP 以簡易 JSON 解析為例
    let queryObj;
    try {
        // 假設系統要求 AI 以固定 JSON 格式回傳查詢結構，例如：
        // { "collection": "users", "method": "find", "filter": {}, "options": { "limit": 10 } }
        queryObj = JSON.parse(rawQuery);
    } catch (e) {
        const err = new Error('Invalid query format. AI must output a valid JSON object.');
        err.code = 'PARSE_ERROR';
        throw err;
    }

    // 強制上系統級 Limit
    if (!queryObj.options) queryObj.options = {};
    queryObj.options.limit = Math.min(queryObj.options.limit || 100, 100);

    return queryObj;
}

module.exports = {
    validateQuery
};
