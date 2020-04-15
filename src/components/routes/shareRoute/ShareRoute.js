import React, { useState, useEffect } from "react";
import "./ShareRoute.css";
import { connect } from "react-redux";
import { shareRoute } from "../../../store/actions/RouteActions";
import FriendList from "../../user/myProfile/FriendList";
import style from "./ShareRoute.css";
import ViadeModal from "../../layout/modal/Modal";
import { deepClone, filterUnsharedFriends } from "../../../utils/functions";
import { Badge } from "react-bootstrap";

export function ShareRoute(props) {
  const { selectedRoute } = props;
  const { shareRoute } = props;
  const friendsToShow = /*(
    props.friends,
    props.sharedWith
  ).map(friend => (friend.checked = false));
  const alreadySharedWith = deepClone(props.sharedWith);
  const [state, setState] = useState({
    friends: friendsToShow,
    friendsToShareWith: alreadySharedWith.map(friend => ({
      ...friend,
      checked: false
    })),
    shared: false
  });*/
  useEffect(() => {
   /* setState({
      ...state,
      friends: friendsToShow,
      friendsToShareWith: deepClone(alreadySharedWith).map(friend => ({
        ...friend,
        checked: false
      }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  const handleOnSave = () => {
   /* shareRoute(selectedRoute, state.friendsToShareWith || []);
    let newFriends = filterUnsharedFriends(
      props.friends,
      state.friendsToShareWith
    );
    setState({
      ...state,
      friends: newFriends,
      friendsToShareWith: state.friendsToShareWith.map(friend => ({
        ...friend,
        checked: false
      })),
      shared: true
    });*/
  };

  const handleClose = () => {
   /* if (!state.shared) {
      setState({ ...state, friendsToShareWith: [] });
    }*/
  };

  const handleOnOpen = () => {
  /*  setState({
      ...state,
      friends: filterUnsharedFriends(props.friends, state.friendsToShareWith)
    });*/
  };

  const handleOnClick = key => {
   /* state.friends[key].checked = !state.friends[key].checked;
    let shared = deepClone(state.friendsToShareWith);
    let friends = deepClone(state.friends);
    if (friends[key].checked) {
      let f = friends[key];
      shared.push(f);
    } else {
      shared.pop(key);
    }
    setState({ ...state, friendsToShareWith: shared, friends: friends });*/
  };
  let activeSelectedFriends = "test"/* state.friendsToShareWith.filter(
   friend => friend.checked
  ).length;*/
  const shareButtonText =
    activeSelectedFriends > 0 ? (
      <span data-testid="share-route-share-button-numbers">
        Share
        <Badge className={style.badge} color="secondary">
          <span data-testid="share-route-share-button-number">
            {activeSelectedFriends}
          </span>
        </Badge>
      </span>
    ) : (
      <span data-testid="share-route-share-button-plain">Share</span>
    );

  return (
    <ViadeModal
      data-testid="share-route-modal"
      onOpen={handleOnOpen}
      disabled={false}
      saveDisabled={activeSelectedFriends === 0}
      toggleText="Share"
      handleClose={handleClose}
      onSave={handleOnSave}
      title="Pick some friends"
      closeText="Close"
      saveText={shareButtonText}
    >
      <FriendList
        data-testid="share-route-friend-list"
        onClick={handleOnClick}
        friends={"test"}
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
