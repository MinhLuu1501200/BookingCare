import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinicService(req.body);

    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
let getALLClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinicService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  getDetailClinicById: getDetailClinicById,
  getALLClinic,
};
