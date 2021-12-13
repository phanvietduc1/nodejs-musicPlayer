const { MongoClient } = require('mongodb');

let db;

MongoClient.connect('mongodb://localhost:27017/myMusicApp', {useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  db = client.db('trackstest');
  console.log('DB is connected')
});

const getConnection = () => {
  return db;
};

module.exports = {
  getConnection
};