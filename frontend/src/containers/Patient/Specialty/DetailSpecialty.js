import { getAction } from "connected-react-router";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../components/HomePage/Header/HomeHeader";
import {
  getAllCodeService,
  getAllDetailSpecialtyById,
} from "../../../services/userService";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }

          let dataProvince = resProvince.data;
          if (dataProvince && dataProvince.length > 0) {
            dataProvince.unshift({
              create: null,
              keyMap: "ALL",
              type: "PROVINCE",
              valueEN: "ALL",
              valueVI: "Toàn quốc ",
            });
          }

          this.setState({
            dataDetailSpecialty: res.data,
            arrDoctorId: arrDoctorId,
            listProvince: resProvince.data,
            listtProvince: dataProvince ? dataProvince : [],
          });
        }
      }
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDocttorId = [];
        if (data && _.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length) {
            arr.map((item) => {
              arrDocttorId.push(item.doctorId);
            });
          }

          this.setState({
            dataDetailSpecialty: res.data,
            arrDoctorId: arrDocttorId,
          });
        }
      }
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="wapper-bg-detail-specialty">
          <div className="detail-specialty-container">
            <div className="detail-specialty-body">
              <div className="description-specialty">
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                  <div className="bg-dalieu">
                    {" "}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetailSpecialty.descriptionHTML,
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="search-sp-doctor">
                <select onChange={(event) => this.handleOnChangeSlect(event)}>
                  {listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.valueVI}
                      </option>
                    );
                  })}
                </select>
              </div>
              {arrDoctorId &&
                arrDoctorId.length > 0 &&
                arrDoctorId.map((item, index) => {
                  return (
                    <div className="each-doctor" key={index}>
                      <div className="dt-content-left">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                      <div className="dt-content-right">
                        <div className="doctor-schedule">
                          <DoctorSchedule doctorIdFromParent={item} />
                        </div>
                        <div className="doctor-extra-infor">
                          <DoctorExtraInfor doctorIdFromParent={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
