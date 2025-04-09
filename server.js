// server.js
const express = require('express');
const fetch = require('node-fetch'); // 설치 필요
const app = express();
const PORT = 3000;

app.use(express.static('public')); // HTML과 stocks.json 위치

app.get('/api/yahoo', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'Missing symbol' });

  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Yahoo' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
