import React, { useEffect } from "react";
import { Image, useWebId, Value, LoggedIn, LoggedOut } from "@solid/react";
import "./MyProfile.css";
import { BsBoxArrowUpRight } from "react-icons/bs";
import FriendList from "./FriendList.js";
import { Button, Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export function MyProfile(props) {
  let email = props.userEmail ? <p>{props.userEmail}</p> : null;
  let emailLoading = props.loading === true ? <p>Loading...</p> : null;

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
                Hello,{" "}
                <b>
                  <Value src="user.name" />
                </b>
              </h1>

              {email}
              {emailLoading}
              <p>
                <Badge variant="dark">
                  <Value src="user.vcard_role" />
                  CEO
                </Badge>
              </p>
              <a href={useWebId()}>
                Solid profile <BsBoxArrowUpRight></BsBoxArrowUpRight>
              </a>
            </div>
            <div id="profileData">
              <Button variant="primary">
                Routes <Badge variant="light">4</Badge>
              </Button>
              <Button variant="primary">
                Shared routes <Badge variant="light">2</Badge>
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

const mapStateToProps = state => {
  return {
    userEmail: state.user.email,
    emailLoading: state.user.emailLoading,
    emailError: state.user.emailError,
    friends: state.user.friends
  };
};

export default connect(mapStateToProps)(React.memo(MyProfile));
