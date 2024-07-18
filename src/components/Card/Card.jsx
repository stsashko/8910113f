import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import classes from "./Card.module.scss";
import PropTypes from "prop-types";
import CallIcon from "@mui/icons-material/Call";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { formatPhoneNumber, formatDate, formatTime } from "../../lib/helpers";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";

const BasicCard = ({ direction, from, to, call_type, created_at }) => {
  const phoneMumber = direction === "inbound" ? from : to;

  return (
    <Card className={classes.card}>
      <CardContent sx={{ pb: "12px!important" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            {direction === "inbound" && (
              <CallIcon
                color={call_type === "answered" ? "success" : "error"}
              />
            )}
            {direction === "outbound" && <PhoneForwardedIcon color="info" />}
            {direction === "voicemail" && <PermPhoneMsgIcon color="success" />}
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold" }}
              color="text.black"
            >
              {formatPhoneNumber(phoneMumber)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", flexDirection: "column" }}
            alignItems="end"
          >
            <Typography sx={{ fontSize: "13px" }} color="text.secondary">
              {formatDate(created_at)}
            </Typography>
            <Typography sx={{ fontSize: "13px" }} color="text.secondary">
              {formatTime(created_at)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

BasicCard.propTypes = {
  direction: PropTypes.string.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  call_type: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default BasicCard;
