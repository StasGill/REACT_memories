import { Container } from "@material-ui/core";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl" disableGutters>
        <NavBar />
        <Switch>
          {/* <Route path="/" exact render={(props) => <Redirect to="/posts" />} /> */}
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/posts/search"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/posts/:id"
            exact
            render={(props) => <PostDetails {...props} />}
          />
          <Route
            path="/auth"
            exact
            render={(props) =>
              !user ? <Auth {...props} /> : <Redirect to="/posts" />
            }
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
