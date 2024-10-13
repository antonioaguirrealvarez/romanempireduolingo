const express = require('express');
const app = express();
const lessonData = require('../data/lessonData.json');

app.get('/api/lessons', (req, res) => {
  res.json(lessonData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));