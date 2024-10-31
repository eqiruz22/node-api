import db from "../db/connection.js";

export const GetAllService = async () => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT service_code,service_name,service_icon,service_tarif FROM services"
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetAllBanner = async () => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT banner_name,banner_image,description FROM banner"
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
