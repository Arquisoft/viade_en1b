import React from "react";
import style from "./UploadRoute.module.css";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import {
  uploadRoute,
  loadRoutesRequest
} from "./../../../store/actions/RouteActions";
import UploadButton from "./uploadButton/UploadButton";
import ViadeModal from "../../layout/modal/Modal";
import parseGPX from "../../../parser/parser";

export class UploadRoute extends React.Component {
  state = {
    name: "",
      description: "",
      file: "",
      author: "",
      reset: false,
      comments: []
  };
  changeHandlerRoute(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  changeHandlerFiles(e) {
    let file = e.target.files[0];
    let parseado = null;
    const self = this;
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function(evt) {
        parseado = parseGPX(evt.target.result);
        //console.log(self.state);
        //console.log(parseado);
        self.state.positions = parseado;
        //console.log(self.state);
      };
      reader.onerror = function(evt) {};
    }
  }

  //This is part of the state, and states should not be tested.
  //This behaviour is tested in the upload button
  changeHandlerImages(e) {
    let docs = [];
    Array.from(e.target.files).forEach(file => docs.push(file.name));
    this.setState({ ...this.state, images: docs });
  }

  //This is part of the state, and states should not be tested.
  //This behaviour is tested in the upload button
  changeHandlerVideos(e) {
    let docs = [];
    Array.from(e.target.files).forEach(file => docs.push(file.name));
    this.setState({ ...this.state, videos: docs });
  }

  changeHandlerComment(e){
    let comment = {}
    
  }

  resetState() {
    return {
      name: "",
      description: "",
      file: "",
      author: "",
      reset: false,
      comments: []
    };
  }

  isEmpty = () => {
    return (
      this.state.name === "" &&
      this.state.description === "" &&
      this.state.positions === ""
    );
  };

  componentDidUpdate() {
    if (this.state.reset) this.setState(this.resetState());
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.uploadRoute.bind(this);
    this.props.uploadRoute(this.state, this.props.routes, this.props.userWebId);
    this.props.loadRoutes.bind(this);
    this.props.loadRoutes();
    this.setState({ ...this.state, reset: true });
  }

  render() {
    return (
      <div className={style.uploadContainer}>
        <Form className={style.form}>
          <div id="form-info">
            <Form.Group htmlFor="routeName">
              <Form.Label htmlFor="name">Name of the route</Form.Label>
              <Form.Control
                id="name"
                onChange={this.changeHandlerRoute.bind(this)}
                placeholder="Route name"
                value={this.state.name}
                type="text"
              />
            </Form.Group>

            <Form.Group htmlFor="routeDescription">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                id="description"
                onChange={this.changeHandlerRoute.bind(this)}
                value={this.state.description}
                as="textarea"
                rows="4"
                placeholder="Add a description"
              />
            </Form.Group>

            <Form.Group htmlFor="routeDescription">
              <Form.Label htmlFor="comments">Comment</Form.Label>
              <Form.Control
                id="comments"
                onChange={this.changeHandlerRoute.bind(this)}
                value={this.state.comments}
                as="textarea"
                rows="4"
                placeholder="Add a comment"
              />
            </Form.Group>



            <ViadeModal
              disabled={this.isEmpty()}
              toggleText="Submit"
              onSave={this.submitForm.bind(this)}
              title="Submitted"
              closeText="Close"
              handleClose={() => {
                this.setState(this.resetState());
              }}
              onOpen={() => {}}
              change
            >
              <p>Your route has been submited</p>
            </ViadeModal>
          </div>

          <div id="buttonHolder">
            <UploadButton
            className={style.uploadButton}
              reset={this.state.reset}
              onChange={this.changeHandlerFiles.bind(this)}
              id="file"
              text="Choose a route"
            ></UploadButton>

          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.route.routes,
    userWebId: state.auth.userWebId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadRoute: (route, routes, webId) =>
      dispatch(uploadRoute(route, routes, webId)),
    loadRoutes: () => dispatch(loadRoutesRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadRoute);
