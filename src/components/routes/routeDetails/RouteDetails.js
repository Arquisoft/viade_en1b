import React from "react";
import style from "./RouteDetails.module.css";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { deleteRoute } from "../../../store/actions/RouteActions";
import ShareRoute from "../shareRoute/ShareRoute";
import Comments from "../../layout/comments/Comments.js";
import { FormattedMessage } from "react-intl";

export const RouteDetails = (props) => {
  const { selectedRoute } = props;
  const { deleteRoute } = props;
  const {userWebId} = props;

  if (selectedRoute != null) {
    let comments = [];
    if (selectedRoute.comments != null) {
      comments = selectedRoute.comments;
      comments = comments.map((comment, key) => {
        return <li key={key}>{comment}</li>;
      });
    }
    const description = selectedRoute.description ? (
      selectedRoute.description
    ) : (
      <FormattedMessage id="NoDescription" />
    );
    const images = selectedRoute.images ? (
      selectedRoute.images
    ) : (
      <FormattedMessage id="NoImages" />
    );
    const videos = selectedRoute.videos ? (
      selectedRoute.videos
    ) : (
      <FormattedMessage id="NoVideos" />
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
        <div className={style.description}>
          <h3>
            <FormattedMessage id="Videos"></FormattedMessage>
          </h3>
          <p data-testid="route-details-videos">{videos}</p>
        </div>
        <div className={style.buttons}>
          <Button
            data-testid="route-details-button-delete"
            id="deleteButton"
            onClick={() => deleteRoute(selectedRoute, userWebId)}
          >
            <FormattedMessage id="Delete" />
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
          <ul>{comments}</ul>
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
  };
};

const mapStateToProps = (state) => {
  return {
    userWebId : state.auth.userWebId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
