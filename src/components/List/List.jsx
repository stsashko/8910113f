import Card from "../Card";
import classes from "./List.module.scss";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

const List = ({ value, index, calls }) => {
  calls = calls.filter(({ is_archived }) => is_archived === Boolean(index));
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <div className={classes.list}>
        {calls.length === 0 && (
          <Alert severity="info" sx={{ border: "solid 1px #ccc" }}>
            The list is empty.
          </Alert>
        )}

        {calls.length > 0 &&
          calls.map(({ id, direction, from, to, created_at, call_type }) => (
            <Link key={id} to={`detail/${id}`} className={classes.link}>
              <Card
                direction={direction}
                from={from}
                to={to}
                created_at={created_at}
                call_type={call_type}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

List.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  calls: PropTypes.array.isRequired,
};

export default List;
