import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

import { IEvent } from "@interfaces/general.interfaces";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar() {
  document.addEventListener(
    "snackbar",
    function (event: IEvent) {
      setSnackbar({
        severity: event.detail.severity,
        message: event.detail.message,
        open: event.detail.open,
      });
    },
    { once: true }
  );

  const [snackbar, setSnackbar] = React.useState<ISnackbarState>({
    severity: "success",
    message: "",
    open: false,
  });

  interface ISnackbarState {
    severity: AlertColor;
    message: string;
    open: boolean;
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
