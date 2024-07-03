const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const CoinGeckoService = require('./services/coinGeckoService');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/coins', async (req, res) => {
  try {
    const coins = await CoinGeckoService.getCoinsList();
    res.json(coins);
  } catch (error) {
    res.status(500).send('Error fetching coins data');
  }
});

app.get('/api/coins/:id', async (req, res) => {
  try {
    const coinDetails = await CoinGeckoService.getCoinDetails(req.params.id);
    res.json(coinDetails);
  } catch (error) {
    res.status(500).send('Error fetching coin details');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
