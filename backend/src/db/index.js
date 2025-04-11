const mongoose = require('mongoose');
const { DB_Name } = require('../constants.js');


const connectDB = async () => {
    try {
        const uri = `${process.env.MONGO_URL}/${DB_Name}`;
        // const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        console.log(`MongoDB URI - ${uri}`);
        const connectionInstance = await mongoose.connect(uri);
        console.log(` MongoDB connected !! DB_HOST - ${connectionInstance.connection.host}`);     
    }catch (error) {
        console.error('MongoDB Connection Failed - ', error) 
        process.exit(1); // Exit process with failure
    }
}
 
module.exports =  connectDB ;
