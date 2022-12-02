//! ici on va utiliser le pooling qui permet  
// ! de gérer connexions 
//! entre une appli express et une BDD
const Pool = require("pg").Pool;

// on se connecte à la db perntodo car c'est celle
//  qu'on a créée ds database.sql
const pool = new Pool({
    user: "postgres",
    password:"digifab74",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

// on va exporter la const pool
module.exports = pool;