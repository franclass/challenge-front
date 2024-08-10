export interface IEvent extends CustomEventInit {
  detail?: any;
}

export interface ISessionContext {
  session: any;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
  isUserLoggedIn: boolean;
}

export interface IOperationInput {
  _id: string;
  amount_a: number;
  amount_b: number;
  type?: string;
  cost?: number;
  date?: string;
  operation_response?: string;
  operations?: IOperationInput[];
}

export interface IUser {
  _id: string;
  email: string;
  current_balance: string;
}

export interface IOperationResult {
  _id: string;
  amount_a: number;
  amount_b: number;
  type?: string;
  cost?: number;
  date?: string;
  operation_response?: string;
  operations?: IOperationInput[];
  operation: IOperationInput[];
  user: IUser[];
}

export interface IRecordsResult {
  records: IOperationResult[];
  page: number;
  limit: number;
}

export interface IRecords {
  _id: string;
  amount_a: number;
  amount_b: number;
  type?: string;
  cost?: number;
  date?: string;
  operation_response?: string;
  operations?: IOperationInput[];
  operation: IOperationInput[];
  user: IUser[];
}

export interface IRecordQuery {
  offset: number;
  filter: string | null;
}
export interface IPagination {
  offset: number;
  limit: number;
  pageItems: number;
  setCurrentOffset: (offset: number) => void;
}
