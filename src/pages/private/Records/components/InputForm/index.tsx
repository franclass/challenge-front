import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import styleCss from "./InputForm.module.scss";
import { IOperationInput } from "@interfaces/general.interfaces";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface AddOperationItemProps {
  onAdd: (operation: IOperationInput) => void;
  operation: IOperationInput;
  setOperation: (operation: IOperationInput) => void;
  operations: IOperationInput[];
}


const InputForm: React.FC<AddOperationItemProps> = ({ onAdd, operation, setOperation, operations }) => {
  
  const [operationinput, setOperationInput] = useState<IOperationInput>({
    _id: "",
    amount_a: 0,
    amount_b: 0,
  });


  useEffect(() => {
    if (Object.keys(operation).length > 0) {
  
          setOperationInput((prev) => ({
            ...prev,
            _id: operation._id,
            amount_a: operation.amount_a,
            amount_b: operation.amount_b,
          }));
      
    }
  }, [operation]);

  const handleSelectOperation = (event: SelectChangeEvent) => {
    setOperationInput((prev) => ({
      ...prev,
      _id: event.target.value,
    }));

  };

  const handleAmountA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationInput((prev) => ({
      ...prev,
      amount_a: Number(event.target.value),
    }));
  };

  const handleAmountB = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationInput((prev) => ({
      ...prev,
      amount_b: Number(event.target.value),
    }));
  };




  const handleAddClick = () => {
   
      const payload: IOperationInput = {
        _id: operationinput._id,
        amount_a: operationinput.amount_a,
        amount_b: operationinput.amount_b,
      };
      onAdd(payload);
      setOperation({} as IOperationInput);

  };

  const handleCancelClick = () => {
    setOperationInput((prev) => ({
      ...prev,
      _id: "",
      amount_a: 0,
      amount_b: 0,
    }));

    setOperation({} as IOperationInput);

  };

  return (
    <div className={styleCss.formContainer}>
     
      <Grid item xs padding={"10px"}>

      <InputLabel id="demo-simple-select-label">Operation Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={operationinput._id}
          label="Age"
          onChange={handleSelectOperation}
          
        >
          {operations.map((operation) => (
            <MenuItem key={operation._id} value={operation._id}>
              {operation.type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs padding={"10px"}>
        <TextField
          label="Amount A"
          value={operationinput.amount_a}
          onChange={handleAmountA}
          fullWidth
          inputProps={{ type: 'number'}}
        />
      </Grid>

      <Grid item xs padding={"10px"}>
        <TextField
          label="Amount B"
          value={operationinput.amount_b}
          onChange={handleAmountB}
          fullWidth
          inputProps={{ type: 'number'}}

        />
      </Grid>
  
      <Grid item padding={"20px"}>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => handleAddClick()}
          style={{ marginRight: "10px" }}
        >
          Send
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => handleCancelClick()}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </Grid>
    </div>
  );
};

export default InputForm;
