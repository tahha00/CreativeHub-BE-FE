const Class = require("../models/Classes");

async function index (req, res) {
    try{
        const classes = await Class.showAll();
        res.json(classes)
    }catch(err){
        res.status(404).json({err: err.message});
    }
}

async function show(req, res){
    try{
            const id = parseInt(req.params.id);
            const snack = await Class.getOneById(id);
            res.status(200).json(snack);
        } catch (err) {
            res.status(404).json({"error": err.message})
        }
    }

async function filterItems(req, res) {
    let venueId = req.params.id; 
    let date = req.params.date
    venueId = parseInt(venueId)
    console.log(venueId)
    console.log(date)
    try {
      const filteredItems = await Class.getItemsByFilters(venueId, date);
      res.status(200).json(filteredItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//   async function dateFilter(req,res){
    
//     let date = req.params.date
//     console.log(date)
//     try {
//         const filteredItems = await Class.getItemByDate(date);
//         res.status(200).json(filteredItems);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//   }



module.exports = {index, filterItems, show}
