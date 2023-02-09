const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static("./"));

app.get('./', (req, res) => {
    res.send('index.html')
})
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});