import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: '100%',
    height: '250px',
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "60px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "55px",
    right: "5px",
    color: "white",
    zIndex: "1",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    marginTop: "10px",
    textAlign: "center",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});
