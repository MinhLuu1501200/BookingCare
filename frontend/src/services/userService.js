import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("check data from service", data);
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  // error api without found user
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (inputData) => {
  // error api without found user
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctor`, data);
};
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
