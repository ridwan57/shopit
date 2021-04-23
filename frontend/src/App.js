import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
