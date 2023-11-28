const db = require("../database/connect")

class Review {
    constructor({ review_id, class_id, review_text, user_id}){
        this.id = review_id;
        this.class_id = class_id;
        this.review_text = review_text;
        this.user_id = user_id
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM review;")
        if (response.rows.length === 0){
            throw new Error ("No Reviews available")
        }
        return response.rows.map(r => new Review(r))
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM review WHERE review_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot locate review")
        }
        return new Review(response.rows[0])
    }

    static async create(data){
        const { review_text } = data;
        let response = await db.query("INSERT INTO review (review_text) VALUES ($1)", [review_text])
        const reviewId = response.rows[0].review_id;
        const newReview = await Review.getOneById(reviewId)
        return newReview
    }

    async destroy(){
        let response = await db.query("DELETE FROM review WHERE review_id = $1 RETURNING *;", [this.review_id])
        return new Review(response.rows[0])
    }


}


