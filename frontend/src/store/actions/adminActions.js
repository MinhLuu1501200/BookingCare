import { toast } from "react-toastify";
import {
  createNewUserService,
  getAllCodeService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctor,
  saveDetailDoctorService,
} from "../../services/userService";
import actionTypes from "./actionTypes";
// import { getAllCodeService } from "../../../services/userService";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "FETCH_GENDER_START" });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (err) {
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Tạo người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const saveUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});
export const saveUserFailed = () => ({
  type: "CREATE_USER_FAILED",
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeService("");
      // console.log("doctor", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchAllUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: "FETCH_ALL_USERS_SUCCESS",
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: "FETCH_ALL_USERS_FAILED",
});
export const deleteNewUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);

      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Xóa người dùng không thành công !!!");
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  users: data,
});
export const deleteAllUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(userId);

      if (res && res.errCode === 0) {
        toast.success("Thay đổi thông tin người dùng thành công !!!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Thay đổi dùng không thành công !!!");
        dispatch(editAUserSuccess());
      }
    } catch (err) {
      dispatch(editAUserUserFailed());
    }
  };
};
export const editAUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  users: data,
});
export const editAUserUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchALLDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo thông tin bác sĩ thành công !!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        toast.error("Tạo thông tin bác sĩ không  thành công !!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
        });
      }
    } catch (err) {
      toast.error("Tạo thông tin bác sĩ không thành công !!!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchALLScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
