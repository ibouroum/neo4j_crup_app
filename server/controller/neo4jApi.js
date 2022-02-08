const session = require("../database/neo4jConn");

exports.InsertMovie = (req, res) => {
  var film = req.body;
  if(film.title && film.date && film.description){
    console.log(film);
  session
    .run(
      "CREATE (:Movie {title:$title, released: $date, tagline :$description } )",
      {
        title: film.title,
        date: film.date,
        description: film.description,
      }
    )
    .then((result) => {
      return result.records[0];
    })
    .catch((error) => {
      console.log("l'erreur" + error);

      throw error;
    });
  } else {
    res.send({ error: "missing Data" });
  }

};
exports.InsertPerson = (req, res) => {
  var person = req.body;
  console.log(person);
  if (person.name && person.date) {
    session
      .run("CREATE (:Person {name:$name, born: $date } )", {
        name: person.name,
        date: person.date,
      })
      .then((result) => {
        return result.records[0];
      })
      .catch((error) => {
        console.log("l'erreur" + error);
        throw error;
      });
  } else res.send({ error: "missing Data" });
};
exports.AddRelation = (req, res) => {
  var data = req.body;
  console.log(data);
  if (data.name && data.title && data.relation) {
    session
      .run(
        "MATCH (a:Movie), (b:Person) WHERE a.title = $title AND b.name = $name call apoc.create.relationship(b,$relation,{rel:$relation},a) yield rel return rel",
        {
          name: data.name,
          title: data.title,
          relation: data.relation,
        }
      )
      .then((result) => {
        return result.records[0];
      })
      .catch((error) => {
        console.log("l'erreur" + error);
        throw error;
      });
  } else res.send({ error: "missing Data" });
};
exports.SearchMovie = (req, res) => {
  var title = req.body.title;
  console.log(req.body);
  if (title) {
    session
      .run("MATCH (a:Movie {title: $title})-[r]-(b) RETURN r,b,a", { title })
      .then((result) => {
        var data = result.records;
        console.log(data.length);
        if (data.length != 0) {
          var object = [];
          data.map((item, i) => {
            object[i] = {
              rel: item._fields[0].type,
              pers: item._fields[1].properties.name,
            };
          });
          var movie = data[0]._fields[2].properties;
          movie.id = data[0]._fields[2].identity.low;
          if (movie.released.low) movie.released = movie.released.low;
          res.send({ movie: movie, relation: object });
        } else res.send({ error: "There is no film with this title" });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.send({ error: "missing Data" });
  }
};
exports.DeleteMovie = (req, res) => {
  var id = req.body.id;
  console.log(id);
  if (id) {
    session
      .run(
        "MATCH (m:Movie) where ID(m)= $id OPTIONAL MATCH (m)-[r]-()  DELETE r,m",
        { id }
      )
      .then((result) => {
        return result.records[0];
      })
      .catch((error) => {
        console.log("l'erreur" + error);

        throw error;
      });
  } else {
    res.send({ error: "data is missing" });
  }
};
exports.DeletePerson = (req, res) => {
  var id = req.body.id;
  console.log(id);
  if (id) {
    session
      .run(
        "MATCH (m:Person) where ID(m)= $id OPTIONAL MATCH ()-[r]-(m)  DELETE r,m",
        { id }
      )
      .then((result) => {
        return result.records[0];
      })
      .catch((error) => {
        console.log("l'erreur" + error);

        throw error;
      });
  } else {
    res.send({ error: "data is missing" });
  }
};
exports.SearchPerson = (req, res) => {
  var name = req.body.name;
  console.log(req.body);
  if (name) {
    session
      .run("MATCH (a:Person {name: $name}) RETURN a", { name })
      .then((result) => {
        var data = result.records;
        console.log(data.length);
        if (data.length != 0) {
          var pers = data[0]._fields;
          console.log(pers[0].properties.born.low);
          if (pers[0].properties.born.low)
            pers[0].properties.born = pers[0].properties.born.low;
          res.send({ person : pers });
        } else res.send({ error: "There is no Person with this name" });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.send({ error: "missing Data" });
  }
};
exports.GetPersons = (req, res) => {
  session
    .run("MATCH (a:Person) RETURN a Limit 5")
    .then((result) => {
      var data = result.records;

      if (data.length != 0) {
        data.map((item) => {
          // console.log(item._fields[0].properties);
          if (item._fields[0].properties.born.low)
            item._fields[0].properties.born =
              item._fields[0].properties.born.low;
           
        });

        res.send({ person : data });
      } else res.send({ data: "There is no Person " });
    })
    .catch((error) => {
      throw error;
    });
};
