import React, { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import style from "./FriendList.css";
import { BsCheck } from "react-icons/bs";

//Used for the checkbox animation
const checkbox = (
  <svg viewBox="0 0 100 100">
    <path
      class="box"
      d="M53.3,46.5c0.1,0,0.2,0.1,0.2,0.2v6.6c0,0.1-0.1,0.2-0.2,0.2h-6.6c-0.1,0-0.2-0.1-0.2-0.2v-6.6c0-0.1,0.1-0.2,0.2-0.2H53.3
		 M53.3,46h-6.6c-0.4,0-0.7,0.3-0.7,0.7v6.6c0,0.4,0.3,0.7,0.7,0.7h6.6c0.4,0,0.7-0.3,0.7-0.7v-6.6C54,46.3,53.7,46,53.3,46L53.3,46
		z"
    />

    <polyline
      class="check"
      class="st0"
      points="47.3,49.9 48.9,51.5 52.8,47.9 "
    />
  </svg>
);

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
                      marginLeft: "1em"
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
