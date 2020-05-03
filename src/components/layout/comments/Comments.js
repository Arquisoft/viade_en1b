import React, { useState } from "react";
import ViadeModal from "../modal/Modal.js";
import { connect } from "react-redux";
import "../comments/Comments.css";
import { FormattedMessage } from "react-intl";
import { FaComment } from "react-icons/fa";
import { uploadComment } from "../../../solid/routes";
import {
  loadRoutesRequest,
  clearRoute,
} from "../../../store/actions/RouteActions.js";

export function Comments(props) {
  const [state, setState] = useState({});
  const { userWebId } = props;

  const CommentButtonText = (
    <span data-testid="Leave-Cooment-text">
      <FormattedMessage id="LeaveComment" />
    </span>
  );
  const handleOpen = () => {
    setState({ ...state, theRoute: props.selectedRoute.name });
  };
  const handleOnSave = () => {
    if (state.comment !== null && state.comment !== "") {
      //Call whatever function to save the comment
      // The comment is save in state.comment
      let routeUri =
        "https://" +
        props.selectedRoute.author +
        "/viade/comments/" +
        props.selectedRoute.id +
        ".jsonld";

      uploadComment(userWebId, routeUri, state.comment).then((response) => {
        props.loadRoutesRequest();
        props.clearRoute();
      });
    }
  };
  const handlerTextArea = (event) => {
    //Call whatever function to save the comment
    setState({ ...state, comment: event.target.value });
  };

  return (
    <div className="GeneralComponent" data-testid="general-component">
      <ViadeModal
        className={props.style}
        data-testid="Modal-component"
        disabled={false}
        toggleText={<FaComment></FaComment>}
        title={
          <FormattedMessage
            id="CommentsModelTitle"
            values={{ theRoute: state.theRoute }}
          />
        }
        closeText={<FormattedMessage id="Close" />}
        onOpen={handleOpen}
        handleClose={() => {}}
        saveText={CommentButtonText}
        onSave={handleOnSave}
      >
        <form id="myForm" data-testid="form-component">
          <label data-testid="label-component">
            <FormattedMessage id="Comments" />
            <br></br>
            <textarea
              id="myTextArea"
              data-testid="textarea-component"
              onChange={handlerTextArea}
            ></textarea>
          </label>
        </form>
      </ViadeModal>
    </div>
  );
}

const mapStateToProps = (theState) => {
  return {
    selectedRoute: theState.route.selectedRoute,
    userWebId: theState.auth.userWebId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRoutesRequest: () => dispatch(loadRoutesRequest()),
    clearRoute: () => dispatch(clearRoute()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
