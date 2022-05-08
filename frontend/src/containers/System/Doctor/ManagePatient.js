import React, { Component } from "react";
import DatePicker from "react-flatpickr";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { dateFormat } from "../../../utils";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }
  async componentDidMount() {
    let { currentDate } = this.state;
    console.log("crruet", this.stat);
    let formatedDate = moment(currentDate).format("MM/DD/YYYY");
    this.getDataPatient(this.props.user, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    console.log(user, formatedDate);
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    console.log("date", date);
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = moment(currentDate).format("MM/DD/YYYY");
        this.getDataPatient(user, formatedDate);
      }
    );
  };
  handleBtnConfirm = () => {};
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient } = this.state;
    console.log("user", this.props);
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label htmlFor="">Chọn ngày khám </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
              />
            </div>
            <div className="col-12 table-manage-patient">
              <table>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th> Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Giới tính</th>
                    <th>Actions</th>
                  </tr>
                  {dataPatient && dataPatient.length > 0
                    ? dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVI}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVI}</td>
                            <td>
                              <button
                                onClick={() => this.handleBtnConfirm()}
                                className="mp-btn-confirm"
                              >
                                Xác nhận
                              </button>
                              <button
                                className="mp-btn-remedy"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Gửi hóa đơn
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "e"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
