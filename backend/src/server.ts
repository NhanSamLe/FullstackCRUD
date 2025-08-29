import express from 'express';
import routerAPI  from './routes/userRoute.js';
import connectDB  from './config/database.js';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1/api', routerAPI);
setupSwagger(app);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})