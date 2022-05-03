import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctors: [],
      hasOldData: false,
      actions: CRUD_ACTIONS.CREATE,
    };
  }
  componentDidMount() {
    this.props.fetchALLDoctors();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      let data = inputData.map((item, index) => {
        let object = {};
        let label = `${item.lastName} ${item.firstName}`;
        object.label = label;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    console.log(res.infor);
    if (
      res &&
      res.infor.errCode === 0 &&
      res.infor.data &&
      res.infor.data.Markdown &&
      res.infor.data.Markdown.contentHTML &&
      res.infor.data.Markdown.contentMarkdown &&
      res.infor.data.Markdown.description
    ) {
      let markdown = res.infor.data.Markdown;
      this.setState({
        ...this.state,
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        ...this.state,
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    console.log(this.state.hasOldData);
    let handleEditorChange = ({ html, text }) => {
      this.setState({
        contentHTML: html,
        contentMarkdown: text,
      });
    };

    return (
      <div className="doctor-container">
        <div className="title">Thêm thông tin bác sĩ</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor="">Chọn bác sĩ </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right ">
            <label>Thông tin giới thiệu</label>
            <textarea
              defaultValue={
                this.state.description ? this.state.description : ""
              }
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDes(event)}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          {" "}
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={this.state.contentMarkdown ? this.state.contentMarkdown : ""}
          />
        </div>
        <button
          className={
            this.state.hasOldData === true
              ? "edit-content-doctor"
              : "save-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldData === true ? "Lưu thông tin" : "Tạo thông tin "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
