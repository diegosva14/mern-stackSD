const usersCtrl = {};
const User = require('../models/User');
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
