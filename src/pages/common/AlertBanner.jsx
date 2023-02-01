import { Alert } from "react-bootstrap";
const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ background: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
