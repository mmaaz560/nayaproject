import express from 'express'
import dns from 'dns';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path'; // ← yeh add
import { postRouter } from './Apis/postApis.js'
import { connectDB } from './config/connect.js'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// 👇 yeh add karo — uploads folder public banao
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

await connectDB()
app.use('/api/post', postRouter)

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
});