import "./App.css";
import Read from "./components/read";
import Create from "./components/create";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <h1 className="main-header">React Crud Operations</h1>
        <div>
          <Route exact path="/" component={Create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path="/read" component={Read} />
        </div>
      </div>
    </Router>
  );
}

export default App;
