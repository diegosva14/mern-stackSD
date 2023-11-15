const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        const tokenSecret = process.env.TOKEN_SECRET;
        console.log('Token Secret:', tokenSecret);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
            if(err) {
                console.error('JWT Verification Error:', err);
            return res.status(400).json({msg: "Authorization not valid."})
        }
            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth