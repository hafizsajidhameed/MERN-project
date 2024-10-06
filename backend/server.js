import express, { json } from "express";
import dotenv from "dotenv"
import productRoutes from "./routes/product.route.js"
import cors from 'cors';
import path from 'path'

dotenv.config();



import { connectDB } from "./config/db.js";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const __dirname = path.resolve();
app.use(cors());

app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}



if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file')
    process.exit(1)
} else {

    app.listen(PORT, () => {
        connectDB();
        console.log("Server is running http://localhost:" + PORT);
    })
}
