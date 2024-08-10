interface IEventDispatch {
  eventName: string;
  payload: any;
}

export const dispatchEvent = ({ eventName, payload }: IEventDispatch) => {
  let myEvent = new CustomEvent(eventName);
  switch (eventName) {
    case "logout":
      myEvent = new CustomEvent(eventName);
      break;
    case "snackbar":
      myEvent = new CustomEvent(eventName, {
        detail: {
          open: payload.open,
          severity: payload.severity,
          message: payload.message,
        },
      });
      break;

    case "refresh_balance":
      myEvent = new CustomEvent(eventName, {
        detail: {
          balance: payload.balance,
      
        },
      });
      break
    default:
      myEvent = new CustomEvent(eventName);
    break;
  }
  document.dispatchEvent(myEvent);
};
