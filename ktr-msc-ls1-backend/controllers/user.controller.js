const {User} = require("../models/user");
const bcrypt = require("bcryptjs")
const {Friend} = require("../models/friend");

module.exports.register = async (req, res) => {
    try{
        const {name, companyName, email, phoneNumber, password} = req.body

        // Check if user exists
        const userExists = await User.exists({ email });
        if (userExists) {
            return res.status(409).send("E-mail already in use");
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({name, companyName, email, phoneNumber, password: encryptedPassword})
        return res.status(201).send(newUser);
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal error. Please try again");
    }
}

module.exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(user && await bcrypt.compare(password, user.password))
            return res.status(200).send(user)
        else
            return res.status(409).send("Error in credentials")
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal error. Please try again");
    }
}

module.exports.addCard = async (req, res) => {
    try{
        const {userId, name, companyName, email, phoneNumber} = req.body

        const user = await User.findById(userId)

        if(user){
            const newFriend = await Friend.create({name, companyName, email, phoneNumber})
            user.cards.push(newFriend._id)
            user.save()
            return res.status(200).send(user)
        }
        else
            return res.status(404).send("User not found")
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal error. Please try again");
    }
}

module.exports.getCards = async (req, res) => {
    try {
        const {userId} = req.body;
        if(userId){
            const user = await User.findById(userId)
            if(user)
                return res.status(200).send(await Friend.find({...userId.cards}))
            else{
                return res.status(404).send("User not found")
            }
        }
        else {
            return res.status(400).send("User id absent")
        }
    }catch (error) {
        console.error(error);
        return res.status(500).send("Internal error. Please try again");
    }
}