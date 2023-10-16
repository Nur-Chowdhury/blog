import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToDatabase from './database.js';


//our routes
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectToDatabase();
const app = express();


app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})