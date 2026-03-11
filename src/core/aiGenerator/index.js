/**
 * 模擬 AI 模型產生 MongoDB 查詢語法
 * 實務上這裡會呼叫 OpenAI / Claude 的 API
 * @param {String} question 使用者問題
 * @param {String} errorMsg 若有失敗過，傳入上一輪的錯誤訊息供修正
 */
async function generateQuery(question, errorMsg = null) {
    // STEP_01 組裝 Prompt (模擬)
    const prompt = `
    User question: ${question}
    Previous error: ${errorMsg || 'None'}
    Generate a safe MongoDB query in JSON format: 
    { "collection": "name", "method": "find|countDocuments", "filter": {} }
  `;

    // STEP_02 (模擬 API 延遲與生成邏輯)
    return new Promise((resolve) => {
        setTimeout(() => {
            // 若是某個測試問題，可以直接回傳寫死的 JSON 來 Demo
            resolve(JSON.stringify({
                collection: "demo_logs",
                method: "countDocuments",
                filter: {}
            }));
        }, 500);
    });
}

module.exports = {
    generateQuery
};
