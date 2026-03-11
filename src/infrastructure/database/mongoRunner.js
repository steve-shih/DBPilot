const { MongoClient } = require('mongodb');

// 全域 MongoClient 實例
let client;
let db;

/**
 * 連線至 MongoDB
 */
async function connectDB() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/datapilot_demo';
    client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    db = client.db();
}

/**
 * 執行已經過安全驗證的查詢
 * @param {String} queryObj 將文字轉成 JS 解析後的 MongoDB JSON Query
 */
async function executeQuery(queryObj) {
    // STEP_01 驗證資料庫是否已連線
    if (!db) {
        throw new Error('Database not connected');
    }

    try {
        const { collection, method, filter = {}, options = {} } = queryObj;

        // STEP_02 針對不同的 MongoDB 方法進行對應執行
        const col = db.collection(collection);
        switch (method) {
            case 'find':
                const cursor = col.find(filter);
                if (options.limit) cursor.limit(options.limit);
                return await cursor.toArray();
            case 'countDocuments':
            case 'count':
                return await col.countDocuments(filter);
            case 'aggregate':
                return await col.aggregate(filter).toArray();
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    } catch (err) {
        throw err; // 將錯誤拋出，交由 Retry Engine 處理
    }
}

module.exports = {
    connectDB,
    executeQuery
};
