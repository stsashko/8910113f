import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { fetchCalls, archiveCalls, unarchiveCalls } from "../api/services/Call";
import List from "../components/List/List";
import { LoadingButton } from "@mui/lab";
import { useLoaderData, json } from "react-router-dom";

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const HomePage = () => {
  const callsData = useLoaderData();
  const [calls, setCalls] = useState(callsData);
  const [loadingButton, setLoadingButton] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchCallsState = async () => {
    try {
      let calls = await fetchCalls();
      setCalls(() => {
        return [...calls];
      });
    } catch (error) {
      return [];
    }
  };

  const handleArchiveCalls = async () => {
    setLoadingButton(true);
    await archiveCalls(calls.map(({ id }) => id));
    await fetchCallsState();
    setLoadingButton(false);
  };

  const handleUnarchiveCalls = async () => {
    setLoadingButton(true);
    await unarchiveCalls();
    await fetchCallsState();
    setLoadingButton(false);
  };

  return (
    <Box className="container-view--inner" sx={{ width: "100%" }}>
      <Box
        className="container-view--tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
          sx={{
            width: "fit-content",
            mx: "auto",
            ".Mui-selected": {
              color: "#2AC420 !important",
            },
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2AC420",
            },
          }}
        >
          <Tab
            label="Activity Feed"
            {...a11yProps(1)}
            sx={{ paddingBottom: "0", px: 0, minWidth: 0 }}
          />
          <Tab
            label="Archived"
            {...a11yProps(0)}
            sx={{ paddingBottom: "0", px: 0, ml: "15px", minWidth: 0 }}
          />
        </Tabs>
      </Box>

      <Box className="container-view--list">
        <div className="container-view--list-inner">
          <List value={value} index={1} calls={calls} />
          <List value={value} index={0} calls={calls} />
        </div>
      </Box>

      <Box className="container-view--footer">
        {value === 0 && (
          <LoadingButton
            variant="contained"
            color="success"
            size="small"
            onClick={handleArchiveCalls}
            loading={loadingButton}
            disabled={
              calls.filter(({ is_archived }) => is_archived === false)
                .length === 0
            }
          >
            Archive all calls
          </LoadingButton>
        )}

        {value === 1 && (
          <LoadingButton
            variant="contained"
            color="success"
            size="small"
            onClick={handleUnarchiveCalls}
            loading={loadingButton}
            disabled={
              calls.filter(({ is_archived }) => is_archived === true).length ===
              0
            }
          >
            Unarchive all calls
          </LoadingButton>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

export async function loader() {
  try {
    let calls = await fetchCalls();
    return calls;
  } catch (error) {
    throw json(
      { message: error.message },
      {
        status: error?.code,
      }
    );
  }
}
