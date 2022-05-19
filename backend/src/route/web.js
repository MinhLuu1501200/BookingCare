import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello world ");
  });
  //rest api demo
  router.get("/homepage", homeController.getHomePage);
  router.get("/aboutpage", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //create api for app
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  //create api all code
  router.get("/api/allcode", userController.getAllCode);

  // api doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  // router.get(
  //   "/api/get-detail-doctor-by-id",
  //   doctorController.getDetailDoctorByID
  // );
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorByID
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorByID
  );
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  //specialty
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.put("/api/edit-specialty", specialtyController.handleEditSpecialty);

  //
  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getALLClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.put("/api/edit-clinic", clinicController.handleEditClinic);
  return app.use("/", router);
};
module.exports = initWebRoutes;
