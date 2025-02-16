const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { restClient } = require("@polygon.io/client-js");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const rest = restClient(process.env.POLYGON_API_KEY);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stock', async (req, res) => {
    try {
        const data = await rest.stocks.aggregates("AAPL", 1, "day", "2025-01-01", "2025-02-01");
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "An error happened: " + e.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
