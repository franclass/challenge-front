
import { render, screen,  waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import Operations from "./index"; 
import { getOperations } from "services/api/operations";
import { getRecords } from "services/api/records";


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

    await act(async () => {
      render(<Operations />);
    });

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

    await act(async () => {
      render(<Operations />);
    });

    await waitFor(() => {
      expect(getOperations).toHaveBeenCalledTimes(1);
      expect(getRecords).toHaveBeenCalledWith({ offset: 0, filter: null });
    });
  });

});
