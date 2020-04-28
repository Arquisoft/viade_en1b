import React from "react";
import style from "./UploadRoute.module.css";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import {
  uploadRoute,
  loadRoutesRequest,
} from "./../../../store/actions/RouteActions";
import UploadButton from "./uploadButton/UploadButton";
import ViadeModal from "../../layout/modal/Modal";
import parseGPX from "../../../parser/parser";
import { FormattedMessage } from "react-intl";

export class UploadRoute extends React.Component {
  state = {
    name: "",
    description: "",
    file: "",
    author: "",
    reset: false,
    positions: [],
    comments: "",
    images: [],
    videos: [],
  };
  changeHandlerRoute(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  changeHandlerFiles(e) {
    let file = e.target.files[0];
    let parseado = null;
    const self = this;
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        parseado = parseGPX(evt.target.result);
        self.state.positions = parseado;
      };
      reader.onerror = function (evt) {};
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  //This is part of the state, and states should not be tested.
  //This behaviour is tested in the upload button
  changeHandlerImages(e) {
    let docs = [];
    Array.from(e.target.files).forEach((file) => {
      docs.push(file);
    });

    this.setState({ ...this.state, images: docs });
  }

  //This is part of the state, and states should not be tested.
  //This behaviour is tested in the upload button
  changeHandlerVideos(e) {
    let docs = [];
    Array.from(e.target.files).forEach((file) => docs.push(file));
    this.setState({ ...this.state, videos: docs });
  }

  resetState() {
    return {
      name: "",
      description: "",
      file: "",
      author: "",
      positions: [],
      reset: false,
      comments: "",
      images: [],
      videos: [],
    };
  }

  isEmpty = () => {
    return !(this.state.name !== "" && this.state.file !== "");
  };

  componentDidUpdate() {
    if (this.state.reset) this.setState(this.resetState());
  }

  submitForm() {
    this.props.uploadRoute.bind(this);
    this.props.uploadRoute(this.state, this.props.routes, this.props.userWebId);
    this.props.loadRoutes.bind(this);
    this.setState({ ...this.state, reset: true });
  }



  render() {
    return (
      <div className={style.uploadContainer}>
        <Form className={style.form}>
          <div id="form-info">
            <Form.Group htmlFor="routeName">
              <Form.Label htmlFor="name">
                <FormattedMessage id="NameOfTheRoute" />
              </Form.Label>
              <FormattedMessage id="RouteNamePlaceholder">
                {(placeholder) => (
                  <Form.Control
                    id="name"
                    onChange={this.changeHandlerRoute.bind(this)}
                    placeholder={placeholder}
                    value={this.state.name}
                    type="text"
                  />
                )}
              </FormattedMessage>
            </Form.Group>

            <Form.Group htmlFor="routeDescription">
              <Form.Label htmlFor="description">
                <FormattedMessage id="Description" />
              </Form.Label>
              <FormattedMessage id="DescriptionPlaceholder">
                {(placeholder) => (
                  <Form.Control
                    id="description"
                    onChange={this.changeHandlerRoute.bind(this)}
                    value={this.state.description}
                    as="textarea"
                    rows="4"
                    placeholder={placeholder}
                  />
                )}
              </FormattedMessage>
            </Form.Group>

            <Form.Group htmlFor="routeDescription">
              <Form.Label htmlFor="comments">
                <FormattedMessage id="Comments" />
              </Form.Label>
              <FormattedMessage id="CommentPlaceholder">
                {(placeholder) => (
                  <Form.Control
                    id="comments"
                    onChange={this.changeHandlerRoute.bind(this)}
                    value={this.state.comments}
                    as="textarea"
                    rows="4"
                    placeholder={placeholder}
                  />
                )}
              </FormattedMessage>
            </Form.Group>

            <ViadeModal
              disabled={this.isEmpty()}
              toggleText={<FormattedMessage id="Submit" />}
              onSave={() => {}}
              title={<FormattedMessage id="Submited" />}
              closeText={<FormattedMessage id="Close" />}
              handleClose={() => {
                setTimeout(() => {
                  this.props.loadRoutes();
                }, 3000);
                this.setState(this.resetState());
              }}
              onOpen={this.submitForm.bind(this)}
              change
            >
              <p>
                <FormattedMessage id="SubmitedRoute" />
              </p>
            </ViadeModal>
          </div>

          <div id="buttonHolder">
            <UploadButton
              className={style.uploadButton}
              reset={this.state.reset}
              onChange={this.changeHandlerFiles.bind(this)}
              id="file"
              file={true}
              text={<FormattedMessage id="UploadButton" />}
            ></UploadButton>
            <UploadButton
              className={style.uploadButton}
              reset={this.state.reset}
              onChange={this.changeHandlerImages.bind(this)}
              id="images"
              images={true}
              text={<FormattedMessage id="UploadImages" />}
            ></UploadButton>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    routes: state.route.routes,
    userWebId: state.auth.userWebId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadRoute: (route, routes, webId) =>
      dispatch(uploadRoute(route, routes, webId)),
    loadRoutes: () => dispatch(loadRoutesRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadRoute);
