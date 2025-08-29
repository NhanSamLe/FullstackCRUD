import express from 'express'; 
import userController  from '../controllers/userController.js';
import { authMiddleware  } from '../middleware/auth.js';
import { delay  } from '../middleware/delay.js';

const routerAPI = express.Router();

routerAPI.use(authMiddleware);
routerAPI.use(delay);

routerAPI.get('/', (req, res) => {
    return res.status(200).json({ message: "API is working" });
});
routerAPI.post('/register', userController.createUser);
routerAPI.post('/login', userController.loginUser);
routerAPI.get("/users", userController.getUsers);
export default routerAPI;
