const db= require('../database/connect')


class Class {
    constructor({ class_id, class_name, venue_name, photo_url, class_date}){
        this.id=class_id;
        this.name=class_name;
        this.venue=venue_name;
        this.photo=photo_url;
        this.date=class_date;
    }


    static async showAll(){
        const response = await db.query('SELECT class.class_id, class.class_name, venue.venue_name, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id)')
        return response.rows.map(p => new Class(p))
    } 

    static async getOneById(id){
        console.log("hello")
        const response = await db.query('SELECT class.class_id, class.class_name, venue.venue_name, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id) WHERE class.class_id=$1;', [id]) 

        console.log(response)

        return new Class(response.rows[0])
      
    }

    static async getOneByName(name){
        const response = await db.query("SELECT class_id, class_name, class_date, start_time, finish_time FROM class WHERE class_name LIKE $1;", [`%${name}%`]) 
        return new Class(response.rows[0])
    }

    static async getItemsByFilters(id, date) {

          const query = await db.query('SELECT class.class_name, venue.venue_name, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id) WHERE class.venue_id=$1 AND class.class_date=$2', [id, date]);
        
          return query.rows.map(p => new Class(p))
      }

    //   static async getItemByDate(date){
    //     const response = await db.query('SELECT class.class_name, venue.venue_name, review.score_out_of_five, class_photo.photo_url, class.class_date FROM class INNER JOIN venue ON (class.venue_id = venue.venue_id) LEFT JOIN review ON (class.class_id = review.class_id) LEFT JOIN class_photo ON (class.class_id = class_photo.class_id) WHERE class.class_date=$1', [date])

    //     return response.rows.map(p => new Class(p))
    //   }
    
}

module.exports = Class ;
