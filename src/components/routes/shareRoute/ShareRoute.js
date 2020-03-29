import React, { useState } from "react";
import "./ShareRoute.css";
import { connect } from "react-redux";
import { shareRoute } from "../../../store/actions/RouteActions";
import FriendList from "../../user/myProfile/FriendList";
import style from "./ShareRoute.css";
import ViadeModal from "../../layout/modal/Modal";
import { deepClone, filterUnsharedFriends } from "../../../utils/functions";
import { Badge } from "react-bootstrap";

function ShareRoute(props) {
  const { selectedRoute } = props;
  const { shareRoute } = props;
  console.log(props);
  const [state, setState] = useState({
    friends: filterUnsharedFriends(props.friends, props.sharedWith),
    friendsToShareWith: []
  });

  

  const handleOnClick = key => {
    state.friends[key].checked = !state.friends[key].checked;
    let shared = deepClone(state.friendsToShareWith);
    let friends = deepClone(state.friends);
    if (friends[key].checked) {
      let f = friends[key];
      shared.push(f);
    } else {
      shared.pop(key);
    }

    setState({ ...state, friendsToShareWith: shared, friends: friends });
  };

  const shareButtonText =
    state.friendsToShareWith.length > 0 ? (
      <React.Fragment>
        Share
        <Badge className={style.badge} color="secondary">
          {state.friendsToShareWith.length}
        </Badge>
      </React.Fragment>
    ) : (
      "Share"
    );

  return (
    <ViadeModal
      disabled={false}
      saveDisabled={state.friendsToShareWith.length === 0}
      toggleText="Share"
      handleClose={() => {}}
      onClick={() => {
        shareRoute(selectedRoute, state.friendsToShareWith);
        setState({
          ...state,
          friends: filterUnsharedFriends(props.friends, props.sharedWith),
          friendsToShareWith: []
        });
      }}
      title="Pick some friends"
      closeText="Close"
      saveText={shareButtonText}
    >
      <FriendList
        onClick={handleOnClick}
        friends={state.friends}
        className={style.friendsExpanded}
        checked
      ></FriendList>
    </ViadeModal>
  );
}

const mapStateToProps = state => {
  return {
    friends: state.user.friends,
    sharedWith: state.route.selectedRoute.sharedWith
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shareRoute: (route, friends) => dispatch(shareRoute(route, friends))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareRoute);
