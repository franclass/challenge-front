import React from "react";
import styleCss from "./Table.module.scss";
import { IOperationInput, IOperationResult } from "@interfaces/general.interfaces";
import { Button } from "@mui/material";
import Pagination from "@components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  onDeleteOperation: (operation: IOperationInput) => void;
  operations: IOperationResult[];
  setCurrentOffset: (offset: number) => void;
  offset: number;
  limit: number;
}


const Table: React.FC<Props> = ({  onDeleteOperation, operations, setCurrentOffset, offset, limit }) => {
let counter=offset;

  return (
    <table className={styleCss["table-users"]}>
      <thead>
        <tr>

          <th>ID</th>
          <th>Date</th>
          <th>User</th>
          <th>Type</th>
          <th>Amount A</th>
          <th>Amount B</th>
          <th>Operation Response</th>
          <th>Cost</th>

          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {(operations?.length>0) && operations?.map((operation) => (
          <tr key={operation._id}>
            <td>{counter=counter+1}</td>
           
            <td>{operation.date}</td>
            <td>{operation.user[0].email}</td>
            <td>{operation.operation[0].type}</td>
            <td>{operation.amount_a}</td>
            <td>{operation.amount_b}</td>
            <td>{operation.operation_response}</td>
            <td>{operation.operation[0].cost}</td>
          
          
            <td>
             
            
              <Button
                
                onClick={() => onDeleteOperation(operation)}
                 data-testid="delete"
              >
                <DeleteIcon />{" "}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={9}>
            <Pagination pageItems={operations.length} offset={offset} limit={limit} setCurrentOffset={setCurrentOffset}/>
          </td>
        </tr>
      </tfoot>
    </table>

  );
};

export default Table;
