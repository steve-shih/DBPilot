# 🚀 DBPilot V3: The Enterprise AI Database Co-Pilot

DBPilot is a powerful, AI-driven database exploration and querying tool designed for both technical and non-technical users. It provides an intelligent bridge between natural language and complex database queries (starting with MongoDB).

---

## 🌟 Key Features

### 1. 🧠 Smart Schema Mapping (AI-Enriched)
DBPilot goes beyond basic field detection. It uses Claude 3.5 Sonnet to analyze data samples and generate:
- **Business Purpose**: Human-readable explanation of each collection in Traditional Chinese.
- **Technical Mapping**: Detailed field types and meanings.
- **Deep Narratives**: Understanding of nested structures and relationship keys.

### 2. 🛡️ Enterprise Governance & Security
- **Human-in-the-Loop**: Optional signature requirement before any query execution.
- **Dynamic Guardrails**: Per-collection forbidden syntax (e.g., `delete`, `drop`) and hard row limits.
- **Auditing**: Every query, cost, and token usage is logged to a local internal database.

### 3. 💰 Real-time Cost Tracking
- **Precision Accounting**: Live calculation of USD costs based on token usage.
- **Transparency**: See exactly how much each query and session costs in the top-left corner.

### 4. 📖 Conversational History
- **History Drawer**: Quickly access and review previous sessions and queries.
- **Soft-Delete**: Clean your history while maintaining a complete audit trail in the backend.

### 5. 🔌 Dual-Usage Architecture
- **Web GUI**: A sleek, wizard-style interface for immediate use.
- **Native SDK**: Export DBPilot as a package to embed safe AI-querying into your own applications.

---

## 🛠️ Quick Start (GUI)

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Setup Environment**:
   Create a `.env` file with your `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`.
3. **Launch**:
   ```bash
   npm run gui
   ```
4. **Connect**:
   Open `http://localhost:4000` and follow the 3-step wizard.

---

## 📦 Developer SDK Usage

You can easily integrate DBPilot's intelligence into your custom tools.

```typescript
import { DBPilotCore } from 'dbpilot';

const pilot = new DBPilotCore({
  targetDatabaseUri: 'mongodb://127.0.0.1:27017/my_app',
  cloudApiKey: process.env.ANTHROPIC_API_KEY,
  selectedAiModel: 'claude', // Default
  requireUserApproval: false  // Direct execution for automation
});

await pilot.initialize();

// Natural language to data
const result = await pilot.ask("找出所有消費大於 1000 元的 VIP 客戶");

console.log("Summary:", result.summary);
console.log("Data:", result.data);
console.log("Cost:", result.costUSD);
```

---

## 🏗️ Architecture

- **Core**: TypeScript + Node.js
- **Internal DB**: Local MongoDB (for metadata, logs, and rules)
- **AI Engines**: Anthropic (Claude), OpenAI, and Ollama support.

---

## 📜 License
Internal Enterprise License - DBPilot Team.