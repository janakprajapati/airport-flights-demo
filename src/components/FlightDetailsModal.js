import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Tabs,
  Tab,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import {
  getDepartureDetailsApi,
  getArrivalDetailsApi,
} from "../services/flights-api";
import { getErrorObject } from "../utilities/api.config";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: 10,
    display: "flex",
    justifyContent: "center",
  },
  header: {
    marginBottom: 4,
    padding: 10,
  },
  contentView: {
    marginBottom: 4,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  formControl: {
    margin: 5,
    minWidth: 60,
  },
  heading: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Typography component="div">{children}</Typography>
    </Typography>
  );
}

const FlightDetailsModal = (props) => {
  const { airportCode, open, handleDialogClose } = props;

  const classes = useStyles();

  const tableColumns = [
    {
      name: "icao24",
      label: "ICAO address",
    },
    {
      name: "firstSeen",
      label: "Departure Time",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{moment(value, "X").format("HH:mm")}</span>;
        },
      },
    },
    {
      name: "lastSeen",
      label: "Arrival Time",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{moment(value, "X").format("HH:mm")}</span>;
        },
      },
    },
    {
      name: "estDepartureAirport",
      label: "Departure Airport",
    },
    {
      name: "estArrivalAirport",
      label: "Arrival Airport",
    },
  ];

  const tableOptions = {
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
    responsive: "scrollMaxHeight",
    selectableRows: "none",
    print: false,
    filter: false,
  };

  const [departingFlights, setDepartingFlights] = useState([]);
  const [arrivingFlights, setArrivingFlights] = useState([false]);
  const [minutes, setMinutes] = useState(30 * 60);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const getArrivalDetails = async (queryString) => {
      try {
        const response = await getArrivalDetailsApi(queryString);
        if (response && response.data) {
          setArrivingFlights(response.data);
        }
      } catch (error) {
        let { message } = getErrorObject(error);
        setArrivingFlights([]);
        console.log(message);
      }
    };

    const getDepartureDetails = async (queryString) => {
      try {
        const response = await getDepartureDetailsApi(queryString);
        if (response && response.data) {
          setDepartingFlights(response.data);
        }
      } catch (error) {
        let { message } = getErrorObject(error);
        setDepartingFlights([]);
        console.log(message);
      }
    };
    if (open) {
      const queryString = `airport=${airportCode}&begin=${moment()
        .utc()
        .subtract(minutes, "minutes")
        .format("X")}&end=${moment().utc().format("X")}`;
      getArrivalDetails(queryString);
      getDepartureDetails(queryString);
    }
  }, [airportCode, minutes, open]);

  const handleCancel = () => {
    handleDialogClose();
  };

  const handleTabChange = (event, tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleCancel}>
      <DialogTitle onClose={handleCancel} className={classes.header}>
        {"Flight Details"}
        <IconButton
          aria-label={"Close"}
          className={classes.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ padding: "0 34px 34px 34px" }}>
        <div className={classes.container}>
          <Typography component="div" className={classes.heading}>
            Flights in last
            <FormControl className={classes.formControl}>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={minutes}
                onChange={handleMinutesChange}
              >
                <MenuItem value={30 * 60}>30</MenuItem>
                <MenuItem value={60 * 60}>60</MenuItem>
                <MenuItem value={120 * 60}>120</MenuItem>
              </Select>
            </FormControl>
            minutes
          </Typography>
          <Grid item sm={12}>
            <Tabs
              value={selectedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
            >
              <Tab label={"Departing Flights"} />
              <Tab label={"Arriving Flights"} />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
              <Typography component="div">
                <MUIDataTable
                  title={""}
                  data={departingFlights}
                  columns={tableColumns}
                  options={tableOptions}
                />
              </Typography>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <Typography component="div">
                <MUIDataTable
                  title={""}
                  data={arrivingFlights}
                  columns={tableColumns}
                  options={tableOptions}
                />
              </Typography>
            </TabPanel>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightDetailsModal;
