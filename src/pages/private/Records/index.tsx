import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  getOperations,
} from "services/api/operations";
import { createRecord, deleteRecord, getRecords } from "services/api/records";
import { IOperationInput, IRecords } from "@interfaces/general.interfaces";
import Table from "./components/Table";
import InputForm from "./components/InputForm";
import memoize from "memoize-one";
import { dispatchEvent } from "@hooks/useEvent";
import { TextField } from "@mui/material";

const Operations = () => {
  const [operations, setoperations] = useState<IOperationInput[]>([]);
  const [records, setRecords] = useState<IRecords[]>([]);
  const [linstenupdate, setListenUpdate] = useState<boolean>(false);
  const [operation, setoperation] = useState<IOperationInput>({} as IOperationInput);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [filter, setFilter] = useState<string | null>(null);

  const operationsFromServer = memoize(async () => {
    const result = await getOperations();
    setoperations(result);
  });

  const recordsFromServer = memoize(async () => {
    const result = await getRecords({offset:page * limit, filter:filter});
    if (result.status === "error") {
      const payload = {
        severity: "error",
        message: result.message,
        open: true,
      };
      dispatchEvent({ eventName: "snackbar", payload });
      setRecords([]);
      return;
    }
    setRecords(result.records);
    setPage(result.pageNumber);
    setLimit(result.limit);
  });

  useEffect(() => {
    operationsFromServer();
    recordsFromServer();


  }, [linstenupdate, page, filter]);


  useEffect(() => {
    if (records.length > 0){
      localStorage.setItem("balance", records[0].user[0].current_balance);
    }
  }, [records]);


  const hanldleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setFilter(null);
    } else
    {
    setFilter(event.target.value);
    }
  };

  const handleDeleteoperation = async (operation: IOperationInput) => {
    await deleteRecord(operation._id);
    setListenUpdate(!linstenupdate);

    const payload = {
      severity: "success",
      message: "Operation deleted successfully",
      open: true,
    };
    dispatchEvent({ eventName: "snackbar", payload });
  };

  const handleAddoperation = async (operation: IOperationInput) => {
    const recordResult = await createRecord(operation);

    if (recordResult.status === "error") {
      const payload = {
        severity: "error",
        message: recordResult.message,
        open: true,
      };
      dispatchEvent({ eventName: "snackbar", payload });
    }
    else{

      setListenUpdate(!linstenupdate);
      const payload = {
        severity: "success",
        message: "Operation added successfully",
        open: true,
      };
      dispatchEvent({ eventName: "snackbar", payload });
      const balance = localStorage.getItem("balance");
      dispatchEvent({ eventName: "refresh_balance", payload:{balance} }); 
    }

  };

  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      <InputForm
        onAdd={handleAddoperation}
        operation={operation}
        setOperation={setoperation}
        operations={operations}
      />
       <TextField
          label="Amount A, Amount B, Operation Response"
          value={filter}
          onChange={hanldleFilter}
          fullWidth
          style={{width: "600px", marginTop: "50px", backgroundColor: "white"}}
        />
      
      <Table
        onDeleteOperation={handleDeleteoperation}
        operations={records}
        offset={page}
        limit={limit}
        setCurrentOffset={setPage}
      />
    </Grid>
  );
};

export default Operations;
