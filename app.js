const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Express server is running');
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});