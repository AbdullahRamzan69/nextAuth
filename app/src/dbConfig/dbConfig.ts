import mongoose from 'mongoose';

export async function connect() {
    try {
        // If already connected, do not re-connect
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables (.env)');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('Something went wrong connecting to the database:', error);
        throw error;
    }
}

export default connect;