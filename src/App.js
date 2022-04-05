import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import memories from "./images/logo.png";
import useStyles from "./styles";
import { getPosts } from "./actions/posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt={memories} height="60" width="60" />
      </AppBar>
      <Grow in>
        {/* <Container> */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        {/* </Container> */}
      </Grow>
    </Container>
  );
}

export default App;
