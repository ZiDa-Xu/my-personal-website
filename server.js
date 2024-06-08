const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let entries = [];

// 获取留言
app.get('/entries', (req, res) => {
    res.json(entries);
});

// 添加留言
app.post('/entries', (req, res) => {
    const entry = req.body;
    entries.push(entry);
    res.status(201).json(entry);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
