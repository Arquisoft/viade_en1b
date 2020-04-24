import data from "@solid/query-ldflex";

export async function getEmail() {
  return new Promise((resolve, reject) => {
    data.user["http://www.w3.org/2006/vcard/ns#hasEmail"].value
      .then(emailId => {
        data[emailId].vcard_value.value
          .then(email => {
            let emailParsed = email.split(":");
            resolve(emailParsed[1]);
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
}

export async function getFriendName(friendWebId) {
  const fixedFriendWebId = friendWebId + "profile/card#me";
  return new Promise((resolve, reject) => {
    data[fixedFriendWebId].name
      .then(name => {
        resolve(name);
      })
      .catch(error => reject(error.message));
  });
}

export function getFriendProfile(friendWebId) {
  let tempFriendurl = friendWebId;

  if (tempFriendurl.includes("inrupt.net"))
    tempFriendurl = tempFriendurl.split("inrupt.net")[0] + "inrupt.net";
  else if (tempFriendurl.includes("solid.community"))
    tempFriendurl =
      tempFriendurl.split("solid.community")[0] + "solid.community";
  else {tempFriendurl = tempFriendurl.split("/profile/")[0]; }

  return tempFriendurl + "/profile/card#me";
}
