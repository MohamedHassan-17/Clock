const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = 3000;



//  Configure the connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           
  password: '1313', 
  database: 'stopwatch' 
});

//  Attempt to connect
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


// updating the database

app.use(express.json());

app.post('/save-session', (req, res) => {
    // We get both pieces of data from the request body
    const { duration, username } = req.body; 

    const sql = `
        INSERT INTO sessions (user_id, duration_milliseconds) 
        SELECT id, ? FROM users WHERE username = ?
    `;

    connection.query(sql, [duration, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.send({ message: `Saved for ${username}` });
    });
});

