const express = require('express');
const app = express();

// Use Render's dynamic port OR fallback to 3000 locally
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
