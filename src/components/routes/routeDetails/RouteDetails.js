import React from "react";
import style from "./RouteDetails.module.css";
import Slideshow from "../../layout/slideshow/Slideshow";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { deleteRoute } from "../../../store/actions/RouteActions";
import ShareRoute from "../shareRoute/ShareRoute";

export const RouteDetails = props => {
  const { selectedRoute } = props;
  const { deleteRoute } = props;

  if (selectedRoute != null) {
    const photos = selectedRoute.images.map(e => {
      return (
        <img
          data-testid="current-image-slideshow"
          src={e}
          alt="Not found"
        ></img>
      );
    });

    const videos = selectedRoute.videos.map(e => {
      return (
        <video width="320" height="240" controls>
          <source src={e} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    });

    const description = selectedRoute.description
      ? selectedRoute.description
      : "There is not description for this route";

    return (
      <div className={props.style ? props.style : style.details}>
        <h3>Descripción</h3>
        <p data-testid="route-details-description">{description}</p>
        <h3>Fotos</h3>
        <Slideshow
          data-testid="route-details-photos"
          images={photos}
        ></Slideshow>
        <h3>Videos</h3>
        <Slideshow
          data-testid="route-details-videos"
          images={videos}
        ></Slideshow>

        <div className={style.buttons}>
          <Button
            data-testid="route-details-button-delete"
            id="deleteButton"
            onClick={() => deleteRoute(selectedRoute)}
          >
            Delete
          </Button>
          {
            <ShareRoute
              data-testid="route-details-button-share"
              id="shareButton"
              selectedRoute={selectedRoute}
            >
              Share
            </ShareRoute>
          }
        </div>
      </div>
    );
  }
  return <div></div>;
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRoute: route => dispatch(deleteRoute(route))
  };
};

export default connect(null, mapDispatchToProps)(RouteDetails);
