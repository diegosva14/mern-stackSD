const usersCtrl = {};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

usersCtrl.register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

usersCtrl.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
usersCtrl.createUser = async (req, res) => {
    console.log(req.body)
    const { username } = req.body;
    const newUser = new User({username});
    console.log(newUser);
    await newUser.save();
    res.json({message: 'User created'});
}
usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'})
}
usersCtrl.getUser = async (req, res) =>{
    const user = await User.findById(req.params.id);
    res.json(user)
}
usersCtrl.editUser = async (req, res) =>{
    const {username} = req.body;
    await User.findByIdAndUpdate({_id:req.params.id},{username});
    res.json({message: 'updated'})
}

module.exports = usersCtrl;
