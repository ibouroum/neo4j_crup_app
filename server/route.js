const express = require('express');
const route = express.Router()
const controller = require('./controller/neo4jApi')
route.post('/insert',controller.InsertMovie);
route.post('/searchMovie',controller.SearchMovie);
route.post('/searchPerson',controller.SearchPerson);
route.get('/getPersons',controller.GetPersons);
route.post('/insertPerson',controller.InsertPerson);
route.post('/addRelation',controller.AddRelation);
route.post('/delete',controller.DeleteMovie);
route.post('/deletePerson',controller.DeletePerson);
module.exports = route