import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { List, Value } from "@solid/react";
import { getFriends } from "rdf-query/rdf-query";

import "./FriendList.css";

export default function MyProfile(props) {
  const openProfile = friendProfile => {
    window.location.href = friendProfile + "profile/card#me";
  };

  useEffect(() => {});
  let friendsCards = props.friends.map((friend, index) => {
    return (
      <Card key={index} onClick={() => openProfile(`${friend.uri}`)}>
        <Card.Body>
          <Card.Link href={friend.uri}>
            <p>{friend.name}</p>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  });
  let friends = <div className="FriendList">{friendsCards}</div>;
  return (
    <div id="friendListContainer">
      <h1>Friends list:</h1>
      {friends}
    </div>
  );
}
