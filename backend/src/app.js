const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://127.0.0.1:5500', // Replace with your frontend URL
  credentials: true
}));

app.use(express.json({limit : "50kb"}));
app.use(express.urlencoded({limit : "50kb", extended : true}));
app.use(express.static('public'));
app.use(cookieParser());


const userRoutes = require('./routes/user.routes.js');
const takeAttendanceRoutes = require('./routes/takeAttendance.routes.js');
const classRoutes = require('./routes/class.routes.js');
const studentRoutes = require('./routes/student.routes.js');
const teacherRoutes = require('./routes/teacher.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const noticeRoutes = require('./routes/notice.routes.js');
const messageRoutes = require('./routes/message.routes.js');

app.use('/api/user', userRoutes);
app.use('/api/attendance', takeAttendanceRoutes);
app.use('/api/class', classRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notice', noticeRoutes);
app.use('/api/message', messageRoutes);


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server"
  });
});

// Serve frontend files
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/pages/admin.page.html'));
});
app.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/pages/teacher.page.html'));
});
app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/pages/student.page.html'));
});

module.exports = { app };
