const Class = require("../models/classes");

async function index (req, res) {
    try{
        const classes = await Class.showAll();
        res.json(classes)
    }catch(err){
        res.status(404).json({err: err.message});
    }
}


module.exports = {index}