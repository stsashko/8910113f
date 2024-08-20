import { useLoaderData, useNavigate, json } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { fetchCall, archiveCall } from "../api/services/Call";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatPhoneNumber, formatDateTime } from "../lib/helpers";

const DetailPage = () => {
  const call = useLoaderData();
  const navigate = useNavigate();
  let callsData = [];

  if (call) {
    for (const property in call) {
      let label = property;
      let value = call[property];

      switch (label) {
        case "created_at":
          label = "Date";
          value = formatDateTime(value);
          break;
        case "call_type":
          label = "Call type";
          break;
        case "from":
          value = formatPhoneNumber(value);
          break;
        case "to":
          value = formatPhoneNumber(value);
          break;
        case "duration":
          value =
            value >= 60 ? `${Math.round(value / 60)} min.` : `${value} sec.`;
          break;
        default:
      }

      if (!["id", "is_archived", "via"].includes(label))
        callsData.push({ label, value });
    }
  }

  const handleChangeArchive = async (id, checked) => {
    try {
      await archiveCall(id, checked);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="container-view--detail">
      <div className="container-view--detail-top">
        <FormControlLabel
          control={
            <Switch
              defaultChecked={call.is_archived}
              onChange={(event) =>
                handleChangeArchive(call.id, event.target.checked)
              }
              color="error"
            />
          }
          label="Archive"
        />
      </div>
      <div className="container-view--detail-body">
        <TableContainer>
          <Table sx={{}} aria-label="simple table">
            <TableBody>
              {callsData.map(({ label, value }) => (
                <TableRow
                  key={label}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {label}
                  </TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="container-view--detail-footer">
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DetailPage;

export async function loader({ params }) {
  const id = params?.id || "";

  try {
    let call = await fetchCall(id);
    return call;
  } catch (error) {
    throw json(
      { message: error.message },
      {
        status: error?.code,
      }
    );
  }
}
