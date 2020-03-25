import data from "@solid/query-ldflex";

export async function getEmail() {
  new Promise(async (resolve, reject) => {
    try {
      const emailsId = await data.user[
        "http://www.w3.org/2006/vcard/ns#hasEmail"
      ].value;
      const firstEmail = await data[emailsId].vcard_value.value;
      const emailParsed = firstEmail.split(":");
      emailParsed.shift();
      resolve(emailParsed.join(":"));
    } catch (err) {
      reject("No email");
    }
  });
}

export async function getFriendName(friendWebId) {
  const fixedFriendWebId = friendWebId + "profile/card#me";
  return await data[fixedFriendWebId].name;
}
