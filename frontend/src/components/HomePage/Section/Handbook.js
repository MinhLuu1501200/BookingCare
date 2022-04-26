import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HandBook.scss";
import "../HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtImg from "../../../assets/images/specialty/co-xuong-khop.jpg";
import Slider from "react-slick";
import "./HandBook.scss";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang </span>
            <button className="btn-section"> Xem thêm </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
              <div className="specialty-customize">
                <img src={specialtImg} alt="" />
                <div>Cơ xương khớp </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
