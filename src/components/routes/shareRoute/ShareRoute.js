import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  shareRoute,
  loadRoutesRequest,
  clearRoute,
} from "../../../store/actions/RouteActions";
import FriendList from "../../user/myProfile/FriendList";
import style from "./ShareRoute.module.css";
import ViadeModal from "../../layout/modal/Modal";
import { deepClone, filterUnsharedFriends } from "../../../utils/functions";
import { Badge } from "react-bootstrap";

export function ShareRoute(props) {
  const { selectedRoute } = props;
  const { shareRoute } = props;
  const friendsToShow = (sharedWith) =>
    filterUnsharedFriends(props.friends, sharedWith).map((friend) => ({
      ...friend,
      checked: false,
    }));
  const alreadySharedWith = deepClone(props.sharedWith);

  const [state, setState] = useState({
    friends: filterUnsharedFriends(
      props.friends,
      props.sharedWith
    ).map((friend) => ({ ...friend, checked: false })),
    friendsToShareWith: alreadySharedWith.map((friend) => ({
      ...friend,
      checked: false,
    })),
    shared: false,
  });

  useEffect(() => {
    setState({
      ...state,
      friends: friendsToShow(props.sharedWith),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sharedWith]);

  const friendsForList = () => {
    return state.friends;
  };
  const handleOnSave = async () => {
    shareRoute(selectedRoute, state.friendsToShareWith || []);
    setTimeout(async () => {
      props.clearRoute();
      props.loadRoutes();
    }, 1000);
  };

  const handleClose = () => {
    if (!state.shared) {
      let uncheckedFriends = state.friends.map((friend) => ({
        ...friend,
        checked: false,
      }));
      setState({ ...state, friends: uncheckedFriends, friendsToShareWith: [] });
    }
  };

  const handleOnClick = (key) => {
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
  let activeSelectedFriends = state.friendsToShareWith.filter(
    (friend) => friend.checked
  ).length;
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
      onOpen={() => {}}
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
        friends={friendsForList()}
        style={{ container: style.friendsExpanded, card: style.cardExpanded }}
        checked
      ></FriendList>
    </ViadeModal>
  );
}

const mapStateToProps = (state) => {
  return {
    friends: state.user.friends,
    sharedWith: state.route.selectedRoute.sharedWith,
    userWebId: state.auth.userWebId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareRoute: (route, friends) => dispatch(shareRoute(route, friends)),
    loadRoutes: () => dispatch(loadRoutesRequest()),
    clearRoute: () => dispatch(clearRoute()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareRoute);
