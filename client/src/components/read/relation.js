import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "semantic-ui-react";

export default function Read() {
  const [Relationship, setRelationship] = useState([]);
  const [Movie, setMovie] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  useEffect(() => {
    // searchFilm()
    getPersons();
  }, []);
  const searchFilm = () => {
    axios
      .post(`/searchMovie`, {
        title: title,
      })
      .then((response) => {
        if (response.data.movie) {
          setMovie(response.data.movie);
          setRelationship(response.data.relation);
          console.log(response.data.relation);
        } else if (response.data.error) alert(response.data.error);
      });
  };
  const getPersons = () => {
    axios.get(`/getPersons`).then((response) => {
      if (response.data.person) {
        var x = response.data.person;
        var y = [];
        x.map((item) => {
          y.push(item._fields);
        });
        setPerson(y);
        console.log(y);
      } else if (response.data.error) alert(response.data.error);
    });
  };
  const searchPerson = () => {
    axios.post(`/searchPerson`,{
      name : name
    }).then((response) => {
      if (response.data.person) {
        var x = response.data.person;
        var y = [];
        y.push(x)
        setPerson(y);
      } else if (response.data.error) alert(response.data.error);
    });
  };
  const onDeleteMovie = (id) => {
    console.log(id);
    axios
      .post(`/delete`, {
        id: id,
      })
      .then((res) => {
        console.log({ res });
        // searchFilm();
      });
  };
  const onDeletePerson = (id) => {
    console.log(id);
    axios
      .post(`/deletePerson`, {
        id: id,
      })
      .then((res) => {
        console.log({ res });
        
      });
  };

  return (
    <div className="home">
      <div className="part">
      <Form className="create-form">
        <h3>Search Film By Title</h3>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Button onClick={searchFilm} type="submit">
          Search
        </Button>
      </Form>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Released </Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Movie && (
            <Table.Row>
              <Table.Cell>{Movie.title}</Table.Cell>
              <Table.Cell>{Movie.tagline}</Table.Cell>
              <Table.Cell>{Movie.released}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => onDeleteMovie(Movie.id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <h3>RealationShip between Film and Person</h3>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Person name</Table.HeaderCell>
            <Table.HeaderCell>RelationShip Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Relationship &&
            Relationship.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.pers}</Table.Cell>
                  <Table.Cell>{data.rel}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      </div>
      
      <div className="part">
      <Form className="create-form">
        <h3>Search Person By Name</h3>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Button onClick={searchPerson} type="submit">
          Search
        </Button>
      </Form>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Person name</Table.HeaderCell>
            <Table.HeaderCell>Born</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {person &&
            person.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data[0].properties.name}</Table.Cell>
                  <Table.Cell>{data[0].properties.born}</Table.Cell>

                  <Table.Cell>
                    <Button onClick={() => onDeletePerson(data[0].identity.low)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      </div>
    </div>
  );
}
