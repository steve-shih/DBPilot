🚀 DBPilot V3
AI Database Co-Pilot | 自然語言查詢資料庫

DBPilot is an AI-powered database exploration tool that allows users to query databases using natural language.

Instead of writing complex queries, you can simply ask questions in plain language, and DBPilot will translate them into safe database queries.

Currently supports MongoDB, with future support for additional databases.

🎬 Demo

⚠️ This project is ~95% generated using Claude & GPT

https://www.youtube.com/watch?v=xbvpvycP0N8

🌟 Features
🧠 AI Schema Understanding

Automatically analyzes database samples and generates:

Business explanations

Field mappings

Nested structure understanding

🛡️ Safety Guardrails

Built-in protection system:

Forbidden query syntax (delete, drop)

Query row limits

Collection access control

Optional Human-in-the-loop approval

💰 Real-time AI Cost Tracking

Token usage monitoring

Live USD cost calculation

Transparent AI usage

📖 Query History

Conversation history

Audit logging

Soft-delete UI with backend trace

🔌 Dual Usage

DBPilot supports two modes:

Web GUI – Wizard-style interface

SDK – Embed into your own systems

🛠 Quick Start
1️⃣ Install
npm install
2️⃣ Setup environment

Create .env

ANTHROPIC_API_KEY=
OPENAI_API_KEY=
3️⃣ Run GUI
npm run gui
4️⃣ Open
http://localhost:4000

Follow the wizard:

Database connection

API key

Query safety settings

📦 SDK Example
import { DBPilotCore } from 'dbpilot';

const pilot = new DBPilotCore({
  targetDatabaseUri: 'mongodb://127.0.0.1:27017/my_app',
  cloudApiKey: process.env.ANTHROPIC_API_KEY,
  selectedAiModel: 'claude',
  requireUserApproval: false
});

await pilot.initialize();

const result = await pilot.ask(
  "Find VIP customers with spending above 1000"
);

console.log(result);
🏗 Architecture

Core: Node.js + TypeScript

Database: MongoDB

AI: Claude / OpenAI / Ollama
