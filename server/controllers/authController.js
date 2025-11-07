import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req,res)=>{
    try{
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });
    
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();
    
      
        res.status(201).json({ user: newUser, token: generateToken(newUser._id) });
    }
    catch(err){
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  

  
      res.status(200).json({ user, token: generateToken(user._id)});
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };