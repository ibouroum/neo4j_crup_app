import React from "react";
import CreateMovie from "./movie";
import CreatePerson from "./person";
import AddRelation from "./relation"

const Main = () => {
  return (
  <div className="home">
      <CreateMovie />
      <CreatePerson />
      <AddRelation />
  </div>);
};
export default Main;
