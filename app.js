const mysql = require('mysql2');



const express = require('express');
const app = express();
const PORT = 3000;



// 1. Configure the connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Your MySQL username
  password: '1313', // Your MySQL password
  database: 'stopwatch' // The name of the DB where you created the tables
});

// 2. Attempt to connect
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('connected'); 
});
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Express server is running');
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});



