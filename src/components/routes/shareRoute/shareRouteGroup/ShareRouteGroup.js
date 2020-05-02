import React, { useState, useEffect } from "react";
import style from "./ShareRouteGroup.module.css";
import { connect } from "react-redux";
import ViadeModal from "../../../layout/modal/Modal";
import { FormattedMessage } from "react-intl";
import { deepClone, filterUnsharedFriends } from "../../../../utils/functions";
import { Badge } from "react-bootstrap";

import { useGroups } from "../../../../utils/hooks/hooks";
import FriendList from "../../../user/myProfile/FriendList";
import { shareRoute } from "../../../../store/actions/RouteActions";

export function ShareRouteGroup(props) {
  const { userWebId, selectedRoute, shareRoute } = props;
  const [state, setState] = useState({ groups: [] });
  const groups = useGroups(userWebId);
  useEffect(() => {
    console.log(groups);
    const checkedGroups = groups.map((group) => ({
      ...group,
      checked: false,
    }));
    console.log(checkedGroups);
    setState({ ...state, groups: checkedGroups });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  const friendsForlist = () => state.groups;
  const handleClose = () => {};
  const handleOnSave = () => {
    let friendsToShare = [];
    state.groups.forEach((group) => {
      group.friends.forEach((friend) => {
        let f = { uri: friend, name: friend.split("//")[1].split("/")[0] };
        friendsToShare.push(f);
      });
    });
    shareRoute(selectedRoute, friendsToShare);
  };

  const handleOnClick = (key) => {
    let groups = deepClone(state.groups);
    let checked = [];
    checked = filterUnsharedFriends(groups, checked);
    let group = groups[key];
    group.checked = !group.checked;
    setState({ ...state, groups: checked });
  };
  const activeSelectedGroups = state.groups.filter((group) => group.checked)
    .length;
  const shareButtonText =
    activeSelectedGroups > 0 ? (
      <span data-testid="share-route-share-button-numbers">
        <FormattedMessage id="Share" />
        <Badge className={style.badge} color="secondary">
          <span data-testid="share-route-share-button-number">
            {activeSelectedGroups}
          </span>
        </Badge>
      </span>
    ) : (
      <span data-testid="share-route-share-button-plain">Share</span>
    );
  return (
    <div className={style.groupsContainer}>
      <ViadeModal
        data-testid="share-group-modal"
        onOpen={() => {}}
        disabled={groups.length === 0}
        saveDisabled={false}
        toggleText={<FormattedMessage id="ShareGroup" />}
        handleClose={handleClose}
        onSave={handleOnSave}
        title={
          <FormattedMessage
            data-testid="share-group-modal-title"
            id="ShareGroupModalTitle"
          />
        }
        closeText={<FormattedMessage id="Close" />}
        saveText={shareButtonText}
      >
        <FriendList
          data-testid="share-group-friend-list"
          onClick={handleOnClick}
          friends={friendsForlist()}
          style={{ container: style.friendsExpanded, card: style.cardExpanded }}
          checked
        ></FriendList>
      </ViadeModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
    selectedRoute: state.route.selectedRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareRoute: (selectedRoute, friends) =>
      dispatch(shareRoute(selectedRoute, friends)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ShareRouteGroup));
