const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}));

app.use(express.json({limit : "50kb"}));
app.use(express.urlencoded({limit : "50kb", extended : true}));
app.use(express.static('public'));
app.use(cookieParser());


const userRoutes = require('./routes/user.routes.js');
const takeAttendanceRoutes = require('./routes/takeAttendance.routes.js');

app.use('/api/user', userRoutes);
app.use('/api/attendance', takeAttendanceRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

module.exports = { app };
