// import mongoose from 'mongoose';

// const connectDB = async () =>{
//     try {
//         const connection = await mongoose.connect(process.env.MONGODB_URI,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`mongo db connected: ${connection.connection.host}`)
//     } catch (err) {
//         console.error(`error message: ${err.message}`);
//         process.exit(1);//is thier is any error then process will stop
//     }
// };

// export default connectDB;




// Yeh poora code copy karke dono projects ke connectDB file me daal do.
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('📡 Mongoose disconnected from MongoDB');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('📡 MongoDB connection closed through app termination');
    process.exit(0);
});

export default connectDB;