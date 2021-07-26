import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";


export default makeStyles((theme) => ({
  appBar: {
 
    margin: '30px 0',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "rgba(251,0,5)",
    textDecoration: "none",
    // fontFamily: "Helvetica"
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(blueGrey[800]),
    backgroundColor: blueGrey[800],
  },
  signIn: {
    border: "1px solid",
    "&:hover": {
      backgroundColor: "rgb(36,41,142)",
      color: "#ffffff",
    },
  },
  logout: {
    backgroundColor: "rgb(255,0,5)",
    color: "#ffffff",
  },
}));
