const express = require('express');
const path = require('path');
const app = express();
const port = 5501;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
