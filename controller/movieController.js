import connection from "../database/dbConnection.js"


function index(req, res, next) {
    const query = `SELECT movies .* , CAST (AVG( reviews. vote) AS FLOAT) AS avg_vote 
    FROM movies 
    LEFT JOIN reviews 
    ON movies.id = reviews.movie_id 
    GROUP BY movies.id`;

    connection.query(query, (err, result) => {
        if (err) return next(err);
        return res.json({
            results: result
        })
    })

}
function show(req, res, next) {

    const id = req.params.id;
    const query = "SELECT * FROM `movies` WHERE `id`=?";

    connection.query(query, [id], (err, results) => {
        if (err) return next(err);

        if (results.length === 0) {
            res.status(404);
            return res.json({
                error: "NOT FOUND",
                message: "Film non trovato"

            })
        }
        const movie = results[0]


        const reviewsQuery = "SELECT * FROM reviews WHERE movie_id =?";
        connection.query(reviewsQuery, [id], (err, reviewsResults) => {
            if (err) return next(err);

            res.json({
                ...movie,
                reviews: reviewsResults,
            })
        })

    })
}
export default { index, show } 