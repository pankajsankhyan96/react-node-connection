const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('../config')
const PORT = process.env.PORT || 3001;

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "API called from react!" });
});

app.post('/api/post', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${JSON.stringify(req.body) + ' envs: ' + process.env.REACT_APP_ENV}`,
  );
});

app.get('/', (req, res) => {
    // res.json({ message: "Welcome to node server!" });
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});