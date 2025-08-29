import User from '../models/user.js';
import type { IUser } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

const create = async (data: Partial<IUser> ) => {
    try {
        const user = await User.findOne({email: data.email});
    if(user){
        console.log("User already exists");
        return false;
    }
    const hashPass = await bcrypt.hash(data.password!, saltRounds);
    const newUser = new User({
        name :data.name,
        email: data.email,
        password: hashPass,
    })
    await newUser.save();
    console.log("User created successfully");
    return true;
    } catch (error) {
        return false;
    }
}

const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            console.log("User not found");
            return false;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log("Invalid credentials");
            return false;
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
        console.log("Login successful");
        return {token};
    } catch (error) {
        console.error("Error logging in:", error);
        return false;
    }
}

const getUser = async () => {
    try {
        const result = await User.find().select('-password');
       return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        return false;
    }
}
export default {
    create,
    login,
    getUser
};
