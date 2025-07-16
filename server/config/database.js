import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongo db connected: ${connection.connection.host}`)
    } catch (err) {
        console.error(`error message: ${err.message}`);
        process.exit(1);//is thier is any error then process will stop
    }
};

export default connectDB;