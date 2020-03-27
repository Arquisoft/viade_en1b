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
      <Card data-testid="friend-list-card" key={index} onClick={() => openProfile(`${friend.uri}`)}>
        <Card.Body>
          <Card.Link data-testid="friend-list-friend-uri" href={friend.uri}>
            <p data-testid="friend-list-friend-name">{friend.name}</p>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  });
  let friends = <div data-testid="friend-list" className="FriendList">{friendsCards}</div>;
  return (
    <div data-testid="friend-list-container" id="friendListContainer">
      <h1 data-testid="friend-list-container">Friends list:</h1>
      {friends}
    </div>
  );
}
