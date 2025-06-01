const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const users = require('./public/users.json');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'Assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/B2C', (req, res) => {
  res.render('login');
});

app.get('/login', (req, res) => {
  res.render('main');
});

app.post('/verify', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log("Verified");
    res.json({ token: user.token, name: user.name });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs11/Course/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', filename);
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

// Route to handle the verification page
app.get('/noc/Ecertificate', (req, res) => {
    const certId = req.query.q;

    if (!certId) {
        return res.status(400).send("Missing certificate ID");
    }

    // Render button page
    res.render('test', { certId });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
