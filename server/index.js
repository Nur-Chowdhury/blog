import dotenv from 'dotenv';

import express from 'express';
import connectToDatabase from './database.js';

//our routes
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';


dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/blogs', blogRoutes);
app.use('/api/admins', adminRoutes);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})