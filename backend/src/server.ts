import express from 'express';
import routerAPI  from './routes/userRoute.js';
import router  from './routes/productRoute.js';
import caterouter  from './routes/categoryRoute.js';
import connectDB  from './config/database.js';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1/api', routerAPI);
app.use('/v1/api/cate', caterouter)
app.use('/v1/api/product',router)
setupSwagger(app);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})