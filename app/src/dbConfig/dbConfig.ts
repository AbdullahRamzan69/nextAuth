import mongoose from 'mongoose';

export async function connect() {
    try {
        // If already connected, do not re-connect
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is not defined in environment variables');
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error. Please make sure MongoDB is running: ' + err);
        });

    } catch (error) {
        console.error('Something went wrong connecting to the database:');
        console.error(error);
    }
}