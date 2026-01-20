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
    const duration = req.body.duration; // The time from your stopwatch

    // This query finds user "17" and uses their ID to create the session
    const sql = `
        INSERT INTO sessions (user_id, duration_milliseconds) 
        SELECT id, ? FROM users WHERE username = '17'
    `;

    connection.query(sql, [duration], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving session");
        }
        res.send({ message: "Session saved for user 17!", sessionId: result.insertId });
    });
});

