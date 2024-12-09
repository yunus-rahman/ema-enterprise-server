const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
// middleware
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",

    ]
}))

// test server
app.get('/', (req, res) => {
    res.send('ema-enterprise is working')
})
app.listen(port, () => {
    console.log(`ema-server is working on port: ${port}`)
})