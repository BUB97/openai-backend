import express from 'express';
const app = express();
const port = 3000;
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

// 手动设置 CORS 头部
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // 预检请求的响应
    res.sendStatus(200);
  } else {
    next();
  }
});

const openai = new OpenAI({
    apiKey: "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",
    httpAgent: new HttpsProxyAgent("http://127.0.0.1:7890"),
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

app.get('/', async (req, res) => {
    const result = await main();
    res.send(result);
})

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
})