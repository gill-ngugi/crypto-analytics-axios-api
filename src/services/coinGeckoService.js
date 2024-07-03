const axios = require('axios');

const CoinGeckoService = {
  getCoinsList: async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coins list:', error);
      throw error;
    }
  },
  
  getCoinDetails: async (id) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for coin ${id}:`, error);
      throw error;
    }
  }
};

module.exports = CoinGeckoService;
