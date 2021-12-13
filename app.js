const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const connectDB = require('./config/db');
const trackRoutes = require('./routes/tracks');

connectDB();

// Routes
app.use('/', require('./routes/index'));
app.use('/tracks', trackRoutes);

const port = process.env.PORT || 1111;
app.listen(port, () => {
  console.log("run at", port);
});