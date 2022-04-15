import { Container } from "@material-ui/core";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route path="/auth" exact render={(props) => <Auth {...props} />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
