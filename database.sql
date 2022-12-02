CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
); 


--* on spécifie àl'interieur quels types de valeurs,
--*  on créée une table appelée todo
-- chaque ID sera unique grace à la PRIMARY KEY; 
-- SERIAL permet d'incrémenter automatiquement les id 
    -- nb max de caractères 