//***************** METTRE EN PLACE UNE RESTFUL API avec POSTGRES********************

// on fait appel à la variable express
const express = require('express')

// variable app qui va faire fonctionner express
const app = express();
const cors = require("cors");
const pool = require("./db");


//* middleware
app.use(cors());

// données côté client
app.use(express.json())
// req.body



//?/ ROUTES //////////////////////

// chaque fois qu'on créée qqch ds postgres on doit utiliser la clause 
//! INSERT INTO car elle spécifie la table ds laquelle on souhaite insérer qqch
// ainsi que la colonne , $1 = placeholder

//? create a todo 


//! post car on ajoute une donnée

app.post("/todos", async (req, res) => {
    // pour avoir requêtes de manières asynchrone
    try {
        // obtenir données qu'on veut ajouter  
        // RETURNING * (* = all), qd on insert, 
        // ajoute ou supprime des données, on va retourner la donnée
        const { description } = req.body;

        //! INSERT = pour insérer des données ds un tableau 
        //^^ todo => nom de la table ou on doit ajouter la valeur
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            // $1 variable qui va spécifier description car place 1 dans le tableau,
            //  $2 s'il y avait eu un 2 champ ds tableau
            [description]
        );
        // try/catch pour attraper erreurs 
        // envoie réponse de type json
        // rows el de body
        res.json(newTodo.rows[0])
    } catch (err) {

        console.error(err.message)


    }
})


//? get all todos

// obtenir tous les todos
app.get("/todos", async (req, res) => {
    try {
        // ! on ne met pas RETURNING * car le but
        //!  de SELECT est de nous renvoyer les données
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})



//? get a todo 

// pour obtenir un todo particulier 
app.get("/todos/:id", async (req, res) => {
    try {
        // await attend le resultat d'une promesse
        // req.params propriété de l'objet contenant la route "parameters"
        const { id } = req.params;
        // ! la clause WHERE: quel élément on veut exactement, todo_id: column
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

// ?update a todo 

// async avant une fonction, signifie que la fonction est une promesse
app.put("/todos/:id", async (req, res) => {

    try {
        const { id } = req.params;
        //! on récupère un param de l'objet req
        //! const todo_description = req.body.todo_description;
        const { description } = req.body;
        console.log(description,id);
        const updateTodo = await pool.query(
            //! clause UPDATE: pour modifier des données
            // ! SET: définir une valeur par défaut pour la colonne
            //  $1 et $2  variables
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description,id]
        );

        res.json("Todo was updated!")

    } catch (err) {
        console.error(err.message);
    }
})

// ? delete a todo 

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // ! clause DELETE: pour supprimer
        // ! clause FROM: pour spécifier le nom de la table à partir
        // !de laquelle vous souhaitez interroger les données(postgresql evalue la clause FROM avant la clause SELECT) 
        const deleteTodo = await pool.query("m",
            [id
            ]);

        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => console.log(`Example app listening on port 5000!`))