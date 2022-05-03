import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../components/HomePage/Header/HomeHeader";
import { getDetailInforDoctor } from "../../../services/userService";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.infor.errCode === 0) {
        this.setState({
          detailDoctor: res.infor.data,
        });
      }
      console.log(res);
      //   imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { detailDoctor } = this.state;
    console.log(detailDoctor.positionData);
    let nameDoctor = `${
      detailDoctor.positionData && detailDoctor.positionData.valueVI
    }, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${this.state.detailDoctor.image})`,
              }}
            ></div>
            <span class="_8f1i"></span>
            <div className="content-right">
              <div className="up">
                <h2>{nameDoctor}</h2>
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right"></div>
          </div>
          <div className="wrapper-bg">
            {" "}
            <div className="detail-infor-doctor">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
