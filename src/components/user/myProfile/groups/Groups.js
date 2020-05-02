import React, { useState, useEffect } from "react";
import style from "./Groups.module.css";
import { GroupList } from "../grouplist/GroupList";
import { connect } from "react-redux";
import ViadeModal from "../../../layout/modal/Modal";
import { FormattedMessage } from "react-intl";
import FriendList from "../FriendList";
import { deepClone, filterUnsharedFriends } from "../../../../utils/functions";
import { Badge, Form } from "react-bootstrap";
import { createGroup } from "../../../../solid/routes";

export function Groups(props) {
  const [state, setState] = useState({ friends: [], groupName: "" });
  useEffect(() => {
    const checkedFriends = props.friends.map((friend) => ({
      ...friend,
      checked: false,
    }));

    setState({ ...state, friends: checkedFriends });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.friends]);
  const friendsForlist = () => state.friends;
  const handleClose = () => {};
  const handleOnSave = () => {
    let groupFriends = state.friends
      .filter((friend) => friend.checked)
      .map((friend) => friend.uri);
    createGroup(props.userWebId, state.groupName, groupFriends);
  };
  const handleOnClick = (key) => {
    let friends = deepClone(state.friends);
    let checked = [];
    checked = filterUnsharedFriends(friends, checked);
    let friend = friends[key];
    friend.checked = !friend.checked;
    setState({ ...state, friends: checked });
  };
  const activeSelectedFriends = state.friends.filter((friend) => friend.checked)
    .length;
  const shareButtonText =
    activeSelectedFriends > 0 ? (
      <span data-testid="share-route-share-button-numbers">
        <FormattedMessage id="CreateGroup" />
        <Badge className={style.badge} color="secondary">
          <span data-testid="share-route-share-button-number">
            {activeSelectedFriends}
          </span>
        </Badge>
      </span>
    ) : (
      <span data-testid="share-route-share-button-plain">Create</span>
    );
  const changeHandlerGroupName = (e) => {
    setState({ ...state, groupName: e.target.value });
  };

  return (
    <div className={style.groupsContainer}>
      <GroupList userWebId={props.userWebId}></GroupList>
      <ViadeModal
        data-testid="create-group-modal"
        onOpen={() => {}}
        disabled={false}
        saveDisabled={false}
        toggleText={<FormattedMessage id="CreateGroup" />}
        handleClose={handleClose}
        onSave={handleOnSave}
        title={
          <FormattedMessage
            data-testid="create-group-modal-title"
            id="CreateGroupModalTitle"
          />
        }
        closeText={<FormattedMessage id="Close" />}
        saveText={shareButtonText}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              value={state.groupName}
              onChange={changeHandlerGroupName}
              type="text"
              placeholder="Name of the group"
            />
          </Form.Group>
        </Form>
        <FriendList
          data-testid="create-group-friend-list"
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
    friends: state.user.friends,
  };
};

export default connect(mapStateToProps)(Groups);
