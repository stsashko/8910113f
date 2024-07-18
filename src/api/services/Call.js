import { errorMessage } from "../../lib/helpers";
import axios from "../axios";

export async function fetchCalls() {
  try {
    const response = await axios.get("activities");
    return response.data;
  } catch (error) {
    throw errorMessage(error);
  }
}

export async function fetchCall(id = "") {
  try {
    const response = await axios.get(`activities/${id}`);
    return response.data;
  } catch (error) {
    throw errorMessage(error);
  }
}

export async function archiveCall(id = "", is_archived) {
  try {
    const response = await axios.patch(`activities/${id}`, {
      is_archived,
    });
    return response.data;
  } catch (error) {
    throw errorMessage(error);
  }
}

export async function archiveCalls(ids = []) {
  if (ids.length === 0) return;

  try {
    for (const id of ids) {
      await archiveCall(id, true);
    }
    return true;
  } catch (error) {
    throw errorMessage(error);
  }
}

export async function unarchiveCalls() {
  try {
    const response = await axios.patch(`reset`);
    return response.data;
  } catch (error) {
    throw errorMessage(error);
  }
}
