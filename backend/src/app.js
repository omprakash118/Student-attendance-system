const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}));

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({limit : "16kb", extended : true}));
app.use(express.static('public'));
app.use(cookieParser());


const userRoutes = require('./routes/user.routes.js');

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = { app };
