const db = require('../database/connect');

class Book {
    constructor({ booking_id, class_id, user_id, class_date, class_start}) {
        this.id = booking_id;
        this.classid = class_id;
        this.userid = user_id;
        this.classdate = class_date;
        this.classstart = class_start;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM booking;");
        return response.rows.map(b => new Book(b));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM booking WHERE booking_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot locate booking")
        }
        return new Book(response.rows[0]);
    }

    static async create(data) {
        const { class_id, user_id, class_date, class_start } = data;
        let response = await db.query("INSERT INTO booking (class_id, user_id, class_date, class_start) VALUES ($1, $2, $3, $4);", [class_id, user_id, class_date, class_start])
        const bookingId = response.rows[0].booking_id;
        const newBook = await Book.getOneById(bookingId)
        return newBook
    }

    async destroy(){
        let response = await db.query("DELETE FROM booking WHERE booking_id = $1 RETURNING *;", [this.booking_id])
        return new Book(response.rows[0])
    }

}

module.exports = Book
