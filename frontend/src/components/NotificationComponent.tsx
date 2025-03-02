import { CheckCircleOutline } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import { Alert, Typography } from "@mui/material";
import { Notification as NotificationType } from "../types";

interface NotificationProps {
  notification: NotificationType | null;
}

const NotificationComponent = (props: NotificationProps) => {
  const { notification } = props;

  if (!notification) {
    return null;
  }

  const { message, severity } = notification;

  return (
    <Alert
      severity={severity}
      icon={severity === "success" ? <CheckCircleOutline /> : <ErrorIcon />}
    >
      <Typography>{message}</Typography>
    </Alert>
  );
};

export default NotificationComponent;
