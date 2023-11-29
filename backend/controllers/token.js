const Token =  require("../models/token")

async function show(req,res){
    try{
        const token = req.params.token
        const response = await Token.getOneByToken(token)
        const user = response.user_id;
        res.status(200).json(user);

    }
    catch(err){
        res.status(404).json({ "error": err.message})
        // console.log(err.message)
        
    }
}

module.exports = { show }
