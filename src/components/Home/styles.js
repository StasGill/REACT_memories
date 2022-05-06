import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 15,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 15,
    marginTop: "1rem",
    padding: "16px",
  },
  mobileMenu: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 15,
    marginBottom: "1rem",
    padding: "16px 16px 0 16px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
      padding: "6px",
    },
  },
  gridContainer: {
    padding: "0 15px 0 15px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      padding: "0px",
    },
  },
}));
