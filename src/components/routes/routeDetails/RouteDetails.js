import React from "react";
import style from "./RouteDetails.module.css";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { deleteRoute } from "../../../store/actions/RouteActions";
import ShareRoute from "../shareRoute/ShareRoute";
import Comments from "../../layout/comments/Comments.js";
import { FormattedMessage } from "react-intl";
import { unshareRoute } from "../../../store/actions/RouteActions";
import { CommentList } from "../../layout/comments/CommentList/CommentList";
import { useComments } from "../../../utils/hooks/hooks";
import Slideshow from "../../layout/slideshow/Slideshow";

/**
 * Component to show the details of the selected route
 * @param {*} props 
 */
export const RouteDetails = (props) => {
  const { selectedRoute, deleteRoute, userWebId, unshareRoute } = props;
  let comments = useComments(selectedRoute);
  if (selectedRoute !== null) {
    const checkAuthority = () => {
      let username = userWebId.split("//")[1].split("/")[0];
      return selectedRoute.author === username;
    };
    const deleteFunction = () => {
      return checkAuthority()
        ? deleteRoute(selectedRoute, userWebId)
        : unshareRoute(selectedRoute.author, selectedRoute.id, userWebId);
    };

    const commentList = <CommentList comments={comments}></CommentList>;

    const buttonText = () => {
      let id = checkAuthority() ? "Delete" : "Unshare";
      return <FormattedMessage id={id}></FormattedMessage>;
    };

    const description = selectedRoute.description ? (
      selectedRoute.description
    ) : (
      <FormattedMessage id="NoDescription" />
    );
    const images = selectedRoute.media ? (
      <Slideshow images={selectedRoute.media}></Slideshow>
    ) : (
      <FormattedMessage id="NoImages" />
    );

    return (
      <div className={props.style ? props.style : style.details}>
        <div className={style.description}>
          <h3>
            <FormattedMessage id="Description"></FormattedMessage>
          </h3>
          <p data-testid="route-details-description">{description}</p>
        </div>
        <div className={style.description}>
          <h3>
            <FormattedMessage id="Images"></FormattedMessage>
          </h3>
          <p data-testid="route-details-images">{images}</p>
        </div>

        <div className={style.buttons}>
          <Button
            data-testid="route-details-button-delete"
            id="deleteButton"
            onClick={() => deleteFunction()}
          >
            {buttonText()}
          </Button>
          {
            <ShareRoute
              data-testid="route-details-button-share"
              id="shareButton"
              selectedRoute={selectedRoute}
            >
              <FormattedMessage id="Share" />
            </ShareRoute>
          }
        </div>
        <div className={style.comments}>
          <h3>
            <FormattedMessage id="CommentsTitle" />
          </h3>
          {commentList}
          <Comments
            style={style.commentsButton}
            data-testid="Comments-button"
          ></Comments>
        </div>
      </div>
    );
  }

  return <div></div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRoute: (route, userWebId) => dispatch(deleteRoute(route, userWebId)),
    unshareRoute: (authorWebId, routeId, userWebId) =>
      dispatch(unshareRoute(authorWebId, routeId, userWebId)),
  };
};

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
