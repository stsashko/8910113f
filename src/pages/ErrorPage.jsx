import { useRouteError } from "react-router-dom";
import Box from "@mui/material/Box";
import icons from "../assets/images/icons.svg";
import Typography from "@mui/material/Typography";

function ErrorPage({ errorCode = "", errorMessage = "" }) {
  let error = useRouteError();
  let message = error?.data?.message || errorMessage || "Something went wrong!";
  let status = error?.status || errorCode || 500;

  return (
    <Box
      className="container-view--inner container-view--inner-error"
      sx={{ width: "100%" }}
    >
      <svg className="error-icon">
        <use
          xlinkHref={`${icons}#${
            parseInt(status) === 404 ? "error-404" : "error"
          }`}
        />
      </svg>

      <Typography sx={{ fontSize: "17px" }} color="error">
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorPage;
