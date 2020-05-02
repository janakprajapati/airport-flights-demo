import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import FlightDetailsModal from "./components/FlightDetailsModal";

const useStyles = makeStyles(() => ({
  root: {},
  heading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  container: {
    padding: 20,
  },
  block: {
    padding: 20,
    margin: 10,
    backgroundColor: "#19B248",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    cursor: "pointer",
  },
}));

const App = () => {
  const classes = useStyles();

  const cities = [
    { id: "KATL", name: "Atlanta" },
    { id: "KLAX", name: "Los Angeles" },
    { id: "KORD", name: "Chicago" },
    { id: "EDDF", name: "Frankfurt" },
    { id: "VIDP", name: "Delhi" },
    { id: "KMCO", name: "Orlando" },
    { id: "LEBL", name: "Barcelona" },
    { id: "LEMD", name: "Barajas" },
    { id: "WMKK", name: "Sepang" },
    { id: "EGLL", name: "Hillingdon" },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState("");

  const handleClick = (code) => {
    console.log("clicked");
    setCode(code);
    setOpenModal(true);
  };

  const handleDialogClose = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Grid item container xs={12} className={classes.container}>
        <Typography variant="h5" className={classes.heading}>
          World Top 10 Airports
        </Typography>
        <Grid item lg={3} md={2} sm={1} />
        <Grid item lg={6} md={8} sm={10}>
          <Grid item container xs={12}>
            {cities.map((city) => {
              return (
                <Grid item md={4} xs={6}>
                  <Paper
                    elevation={1}
                    className={classes.block}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(city.id);
                    }}
                  >
                    {city.name}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item lg={3} md={2} sm={1} />
      </Grid>
      <FlightDetailsModal
        airportCode={code}
        open={openModal}
        handleDialogClose={handleDialogClose}
      />
    </Fragment>
  );
};

export default App;
