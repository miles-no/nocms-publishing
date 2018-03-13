const app = require('express')();
const cors = require('cors');
const folders = require('./mockdata/folders.json');
const Backgrounds = require('./mockdata/folders/Backgrounds.json');

const folderContent = {
  Backgrounds,
};

const port = 9001;

app.use(cors());

app.get('/images/folders/:folderName', (req, res) => {
  const folderName = req.params.folderName || '';
  res.status(200).json(folderContent[folderName] || {});
});

app.get('/images/folders', (req, res) => {
  res.status(200).json(folders);
});

try {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (e) {
  console.log('Couldn\'t start server', e);
}
