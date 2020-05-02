import React from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    display: "flex",
    fontSize: 22
  },
  container: {
    padding: 40
  }
}));

const UserTable = props => {
  const { data } = props;

  const classes = useStyles();

  const columns = ["name", "date", "number", "description"];
  const options = {
    responsive: "scrollMaxHeight",
    selectableRows: "none",
    print: false,
    download: false
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <MUIDataTable
          title={"Patients List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default UserTable;
