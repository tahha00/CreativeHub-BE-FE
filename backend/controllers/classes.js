const Class = require("../models/Classes");

async function index (req, res) {
    try{
        const classes = await Class.showAll();
        if (classes.length === 0) {
            return res.status(404).json({ error: 'No classes found.' });
          }
        res.status(200).json(classes)
    }catch(err){
        res.status(404).json({error: "Something happened to your db"});
    }
}

async function show(req, res){
    try{
            const id = parseInt(req.params.id);
            const snack = await Class.getOneById(id);
            if (snack.length === 0) {
                return res.status(404).json({ error: 'No class found.'});
            }
            res.status(200).json(snack);
        } catch (err) {
            res.status(404).json({error: "Something happened to your db"});
        }
    }

async function showSpecific(req,res){
    try{
        const name = req.params.name
        const class_id = await Class.getOneByName(name);
        res.status(200).json(class_id);

    }
    catch(err){
        res.status(404).json({ "error": err.message})

    }
}



async function filterItems(req, res) {
    let venueId = req.params.id; 
    let date = req.params.date
    venueId = parseInt(venueId)
    try {
      const filteredItems = await Class.getItemsByFilters(venueId, date);

      if(filteredItems.length === 0){
        return res.status(500).json({ error: 'Not found'})
      }
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



module.exports = {index, filterItems, show, showSpecific}
