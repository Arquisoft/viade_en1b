import React from "react";
import { Image, useWebId, Value, LoggedIn, LoggedOut } from "@solid/react";
import "./MyProfile.css";
import { BsBoxArrowUpRight } from "react-icons/bs";
import FriendList from "./FriendList.js";
import { Button, Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  getOwnRoutesNumber,
  getSharedRoutesNumber,
} from "../../../utils/functions";

export function MyProfile(props) {
  let email = props.userEmail ? <p>{props.userEmail}</p> : null;
  let emailLoading = props.loading === true ? <p>Loading...</p> : null;
  const { routes } = props;
  const {userWebId} = props;

  return (
    <div id="generalComponent">
      <LoggedIn>
        <div id="card">
          <div id="image-cropper">
            <Image
              src="user.vcard_hasPhoto"
              defaultSrc="profile.svg"
              id="profilePicture"
            />
          </div>

          <div id="allData">
            <div id="profileData">
              <h1>
                <FormattedMessage id="Greetings" />,{" "}
                <b>
                  <Value src="user.name" />
                </b>
              </h1>

              {email}
              {emailLoading}
              <p>
                <Badge variant="dark">
                  {<Value src="user.vcard_role" /> ? (
                    <Value src="user.vcard_role" />
                  ) : (
                    <FormattedMessage id="CEO" />
                  )}
                </Badge>
              </p>
              <a href={useWebId()}>
                <FormattedMessage id="SolidProfile" />{" "}
                <BsBoxArrowUpRight></BsBoxArrowUpRight>
              </a>
            </div>
            <div id="profileData">
              <Button variant="primary">
                <FormattedMessage id="Routes" />
                <Badge variant="light">
                  {getOwnRoutesNumber(routes, userWebId)}
                </Badge>
              </Button>
              <Button variant="primary">
                <FormattedMessage id="SharedRoutes" />{" "}
                <Badge variant="light">
                  {getSharedRoutesNumber(routes, userWebId)}
                </Badge>
              </Button>
            </div>
          </div>
          <FriendList friends={props.friends} id="friendList" />
        </div>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.user.email,
    emailLoading: state.user.emailLoading,
    emailError: state.user.emailError,
    friends: state.user.friends,
    routes: state.route.routes,
    userWebId: state.auth.userWebId
  };
};

export default connect(mapStateToProps)(React.memo(MyProfile));
