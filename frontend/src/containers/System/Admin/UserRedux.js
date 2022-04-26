import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import "./UserRedux.scss";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   console.log(res);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArray: res.data,
    //       roleArr: [],
    //       positionArr: [],
    //     });
    //   }
    // } catch (err) {}
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length ? arrRoles[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
  }
  handleOnChangeImg = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: file,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidate = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i <= arrCheck.length; i++) {
      if (this.state[arrCheck[i]] === "") {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = (event) => {
    event.preventDefault();
    let isValid = this.checkValidate();
    if (isValid === false) {
      return;
    }
    //fire action
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      phoneNumber: this.state.phoneNumber,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isGetGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <>
        <div className="container">
          {isGetGender ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="title">Quản lý tài khoản người dùng</div>
          <div className="add-user">Thêm mới người dùng </div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <form>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value={email}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        value={password}
                        onChange={(event) => {
                          this.onChangeInput(event, "password");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputFirstName">Tên </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstName"
                        value={firstName}
                        onChange={(event) => {
                          this.onChangeInput(event, "firstName");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputLastName">Họ </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastName"
                        value={lastName}
                        onChange={(event) => {
                          this.onChangeInput(event, "lastName");
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="phoneNumber">Số điện thoại </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(event) => {
                          this.onChangeInput(event, "phoneNumber");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-9">
                      <label htmlFor="inputAddress">Địa chỉ </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        value={address}
                        onChange={(event) => {
                          this.onChangeInput(event, "address");
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputGender">Giới tính</label>
                      <select
                        id="inputGender"
                        className="form-control"
                        onChange={(event) => {
                          this.onChangeInput(event, "gender");
                        }}
                      >
                        {genders &&
                          genders.length > 0 &&
                          genders.map((gender) => {
                            return (
                              <option key={gender.key} value={gender.key}>
                                {gender.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputRole">Chức danh</label>
                      <select
                        id="inputRole"
                        className="form-control"
                        onChange={(event) => {
                          this.onChangeInput(event, "position");
                        }}
                      >
                        {positions &&
                          positions.length > 0 &&
                          positions.map((position) => {
                            return (
                              <option key={position.key} value={position.key}>
                                {position.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputPosition">Vai trò</label>
                      <select
                        id="inputPosition"
                        className="form-control"
                        onChange={(event) => {
                          this.onChangeInput(event, "role");
                        }}
                      >
                        {roles &&
                          roles.length > 0 &&
                          roles.map((role) => {
                            return (
                              <option key={role.key} value={role.key}>
                                {role.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputAvatar">Ảnh đại diện </label>
                      <div
                        className="preview-img-container"
                        onChange={(event) => {
                          this.handleOnChangeImg(event);
                        }}
                      >
                        <input type="file" id="previewImg" hidden />
                        <label className="label-upload" htmlFor="previewImg">
                          Tải ảnh
                          <i className="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary mt-2"
                    onClick={(event) => {
                      this.handleSaveUser(event);
                    }}
                  >
                    Lưu người dùng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout())
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
