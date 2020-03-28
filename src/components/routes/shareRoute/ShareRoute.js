import React, { useState } from "react";
import "./ShareRoute.css";
import ViadeModal from "../../layout/modal/Modal";
import { connect } from "react-redux";
import { shareRoute } from "../../../store/actions/RouteActions";
import FriendList from "../../user/myProfile/FriendList";
import style from "./ShareRoute.css";
import { deepClone } from "../../../utils/functions";
import { Badge } from "react-bootstrap";

function ShareRoute(props) {
  const { selectedRoute } = props;
  var { selectedFriend } = "";
  const { shareRoute } = props;

  const [state, setState] = useState({
    friends: deepClone(props.friends),
    friendsToShareWith: []
  });

  const resetState = () => {
    setState({
      friends: deepClone(props.friends),
      friendsToShareWith: []
    });
  };

  const handleOnClick = key => {
    state.friends[key].checked = !state.friends[key].checked;
    let array = [...state.friendsToShareWith];
    if (state.friends[key].checked) {
      array.push(state.friends[key]);
    } else {
      array.pop(key);
    }

    setState({ ...state, friendsToShareWith: array });
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
      handleClose={resetState}
      onClick={() => {
        shareRoute(selectedRoute, selectedFriend);
      }}
      title="Who do you want to share your routes with?"
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
    friends: state.user.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shareRoute: (route, friendUri) => dispatch(shareRoute(route, friendUri))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareRoute);
