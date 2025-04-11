const dotenv = require('dotenv');
const connectDB = require('./db/index.js');
const { app } = require('./app.js');

dotenv.config({ 
    path: './.env' 
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
});