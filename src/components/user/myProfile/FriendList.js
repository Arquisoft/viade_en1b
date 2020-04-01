import React from "react";
import { Card, Form } from "react-bootstrap";
import style from "./FriendList.css";
import { BsCheck } from "react-icons/bs";
import { getFriendProfile } from "../../../solid/profileInfo";

const FriendList = props => {
  //Function used by the non-checked version of the component
  const openProfile = friendProfile => {
    window.location.href = getFriendProfile(friendProfile);
  };

  //Checked friendList to be used by the ShareRoute component
  let friendsCardsWithCheckBoxes = props.friends.map((friend, key) => {
    return (
      <Card
        data-testid={"card" + key}
        onClick={() => props.onClick(key)}
        key={key}
      >
        <Card.Body style={{ marginLeft: "1em" }}>
          <Form.Check
            onChange={() => {}}
            checked={friend.checked ? true : false}
            type="checkbox"
            label={
              friend.checked ? (
                <React.Fragment>
                  {friend.name}
                  <BsCheck
                    style={{
                      color: "yellowgreen",
                      transform: "scale(2)",
                      display: "inline-block",
                      marginLeft: "1em",
                      transition: "all 200ms ease-in-out"
                    }}
                    color="green"
                  ></BsCheck>
                </React.Fragment>
              ) : (
                friend.name
              )
            }
          ></Form.Check>
        </Card.Body>
      </Card>
    );
  });

  let friendsCards = props.friends.map((friend, index) => {
    return (
      <Card
        data-testid="friend-list-card"
        key={index}
        onClick={() => openProfile(`${friend.uri}`)}
      >
        <Card.Body>
          <Card.Link data-testid="friend-list-friend-uri" href={friend.uri}>
            <p data-testid="friend-list-friend-name">{friend.name}</p>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  });
  let friends = (
    <div className="FriendList">
      {props.checked ? (
        friendsCardsWithCheckBoxes
      ) : (
        <React.Fragment>
          <h1>Friends List</h1>
          {friendsCards}
        </React.Fragment>
      )}
    </div>
  );

  return (
    <div
      className={style.friendListContainer}
      data-testid="friend-list-container"
      id="friendListContainer"
    >
      <h1 data-testid="friend-list-container">Friends list:</h1>
      {friends}
    </div>
  );
};

export default FriendList;
