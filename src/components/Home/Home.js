import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from "../../actions/posts";
import Form from "../Form/Form";
import CustomPagination from "../Pagination";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useWindowSize } from "../../helper/useWindowSize";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
    },
  },
};

export const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showAdd, setShowAdd] = useState(true);
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery();
  const page = query.get("page") || 1;

  const size = useWindowSize();
  const isMobile = size.width < 960;

  useEffect(() => {
    if (isMobile) {
      setShow(false);
      setShowAdd(false);
    }
  }, [isMobile]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
        className={classes.gridContainer}
        disableGutters
      >
        <Grid item xs={12} sm={12} md={8}>
          <Posts setCurrentId={setCurrentId} />
          <Paper elevation={6} className={classes.pagination}>
            <CustomPagination page={page} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {isMobile && (
            <Paper elevation={6} className={classes.mobileMenu}>
              <Button onClick={() => setShow(!show)}>
                <SearchIcon />
              </Button>
              <Button onClick={() => setShowAdd(!showAdd)}>
                <AddIcon />
              </Button>
            </Paper>
          )}
          {show && (
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
          )}
          {showAdd && (
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          )}
        </Grid>
      </Grid>
    </Grow>
  );
};
