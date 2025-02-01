const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000 || 8000
app.use(cors());

app.get('/', (req, res) => {
  const date = new Date();

  res.status(200).json({
    email: 'chimachinemerem4@gmail.com',
    current_datetime: date.toDateString(),
    github_url: "https://github.com/Chima-01/MYWORKSPACE/hng12_backend"
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});