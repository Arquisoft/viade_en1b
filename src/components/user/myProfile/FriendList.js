import React from "react";
import { Card, Form } from "react-bootstrap";
import style from "./FriendList.css";
import { BsCheck } from "react-icons/bs";

const FriendList = props => {
  //Function used by the non-checked version of the component
  const openProfile = friendProfile => {
    window.location.href = friendProfile + "profile/card#me";
  };

  //Checked friendList to be used by the ShareRoute component
  let friendsCardsWithCheckBoxes = props.friends.map((friend, key) => {
    return (
      <Card onClick={() => props.onClick(key)} key={key}>
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

  let friendsCards = props.friends.map(friend => {
    return (
      <Card key={friend.uri} onClick={() => openProfile(`${friend.uri}`)}>
        <Card.Body>
          <Card.Link href={friend.uri}>
            <p>{friend.name}</p>
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
  return <div className={style.friendListContainer}>{friends}</div>;
};

export default FriendList;
