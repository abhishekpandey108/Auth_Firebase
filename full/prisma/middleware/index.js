const admin = require('../firebase/firebaseConfig');

class Middleware{
    async decodeToken(req,res,next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await admin.auth().verifyIdToken(token)
            if(decoded) return next();
            return res.json({message:'Unauthorized '});
        }catch(err){
            res.status(401).json({message:err.message});
        }
    }
}

module.exports = new Middleware();