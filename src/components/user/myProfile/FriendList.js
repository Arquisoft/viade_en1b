import React from "react";
import { Card, Form } from "react-bootstrap";
import style from "./FriendList.css";
import { BsCheck } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

/**
 * Component to show the friend list
 * @param {*} props 
 */
export const FriendList = (props) => {
  //Function used by the non-checked version of the component
  const onClick = (friend) => {
    return <Redirect to={friend.uri} />;
  };

  let friendsCardsWithCheckBoxes = props.friends.map((friend, key) => {
    return (
      <Card
        data-testid={"card" + key}
        onClick={() => props.onClick(key)}
        className={props.style ? props.style.card : ""}
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
                    data-testid={"friend-list-check" + key}
                    style={{
                      color: "yellowgreen",
                      transform: "scale(2)",
                      display: "inline-block",
                      marginLeft: "1em",
                      transition: "all 200ms ease-in-out",
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
        key={index}
        onClick={(friend) => onClick(friend)}
        data-testid={"friend-list-card" + index}
      >
        <Card.Body>
          <Card.Link
            data-testid={"friend-list-friend-uri" + index}
            href={friend.uri}
          >
            <p data-testid={"friend-list-friend-name" + index}>{friend.name}</p>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  });
  let friends = (
    <div data-testid="friend-list-main" className="FriendList">
      {props.checked ? (
        friendsCardsWithCheckBoxes
      ) : (
        <React.Fragment>{friendsCards}</React.Fragment>
      )}
    </div>
  );

  return (
    <div
      className={
        props.style ? props.style.container : style.friendListContainer
      }
      data-testid="friend-list-container"
      id="friendListContainer"
    >
      <h1 data-testid="friend-list-heading">
        <FormattedMessage id="FriendsList" />
      </h1>
      {friends}
    </div>
  );
};

export default FriendList;
