import { GetAllBanner, GetAllService } from "../service/ServiceList.js";
import { ResponseJSON } from "../utils/response.js";

export const FetchAll = async (req, res) => {
  try {
    const data = await GetAllService();
    return ResponseJSON(res, 200, 0, "Sukses", data);
  } catch (error) {
    return ResponseJSON(res, 500, 500, error.message, null);
  }
};

export const FetchAllBanner = async (req, res) => {
  try {
    const data = await GetAllBanner();
    return ResponseJSON(res, 200, 0, "Sukses", data);
  } catch (error) {
    return ResponseJSON(res, 500, 500, error.message, null);
  }
};
