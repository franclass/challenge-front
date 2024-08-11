import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Operations from "./index"; 
import { getOperations } from "services/api/operations";
import { createRecord, deleteRecord, getRecords } from "services/api/records";
import { dispatchEvent } from "../../../hooks/useEvent";
import { get } from "http";

// Mock external dependencies
jest.mock("services/api/operations", () => ({
  getOperations: jest.fn(),
}));

jest.mock("services/api/records", () => ({
  createRecord: jest.fn(),
  deleteRecord: jest.fn(),
  getRecords: jest.fn(),
}));

jest.mock("../../../hooks/useEvent", () => ({
  dispatchEvent: jest.fn(),
}));

describe("Operations Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", async () => {
    (getOperations as jest.Mock).mockResolvedValue([]);
    (getRecords as jest.Mock).mockResolvedValue({
      status: "success",
      records: [],
      pageNumber: 0,
      limit: 10,
    });

    render(<Operations />);

    await waitFor(() => {
      expect(screen.getByLabelText("Amount A, Amount B, Operation Response")).toBeInTheDocument();
    });
  });

  test("calls getOperations and getRecords on mount", async () => {
    (getOperations as jest.Mock).mockResolvedValue([]);
    (getRecords as jest.Mock).mockResolvedValue({
      status: "success",
      records: [],
      pageNumber: 0,
      limit: 10,
    });

    render(<Operations />);

    await waitFor(() => {
      expect(getOperations).toHaveBeenCalledTimes(1);
      expect(getRecords).toHaveBeenCalledWith({ offset: 0, filter: null });
    });
  });

  test("handles adding an operation", async () => {
    const mockOperation = { _id: "66b51bfc5ab45c757ecbf41b", amount_a: 10, amount_b: 20 };
  
    
    (createRecord as jest.Mock).mockResolvedValue({ status: "success" });
    // (getOperations as jest.Mock).mockResolvedValue([]);
    (getRecords as jest.Mock).mockResolvedValue({
      status: "success",
      records: [],
      pageNumber: 0,
      limit: 10,
    });

    
  
    
    render(<Operations />);
  
    fireEvent.change(screen.getByLabelText('Amount A'), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText('Amount B'), { target: { value: 20 } });
    fireEvent.change(screen.getByLabelText('Operation Type'), { target: { value: '66b51bfc5ab45c757ecbf41b' } });

  
   
    await waitFor(() => {
      expect(createRecord).toHaveBeenCalledWith(mockOperation);
      expect(getOperations).toHaveBeenCalledTimes(1);
    });
  
    
    await waitFor(() => {
      expect(dispatchEvent).toHaveBeenCalledWith({
        eventName: "snackbar",
        payload: expect.objectContaining({
          severity: "success",
          message: "Operation added successfully",
        }),
      });
    });
  });

  test("handles deleting an operation", async () => {
    const mockOperation = { _id: "66b51bfc5ab45c757ecbf41b" };
    (deleteRecord as jest.Mock).mockResolvedValue({ status: "success" });
    (getOperations as jest.Mock).mockResolvedValue([]);
    (getRecords as jest.Mock).mockResolvedValue({
      status: "success",
      records: [],
      pageNumber: 0,
      limit: 10,
    });

    render(<Operations />);

    // Simulate a delete event if necessary
    // Example: fireEvent.click(screen.getByText('Delete'));
    
    await waitFor(() => {
      expect(deleteRecord).toHaveBeenCalledWith(mockOperation._id);
      expect(dispatchEvent).toHaveBeenCalledWith({
        eventName: "snackbar",
        payload: expect.objectContaining({ severity: "success", message: "Operation deleted successfully" }),
      });
    });
  });
});
