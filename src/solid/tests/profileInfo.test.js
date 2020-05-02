import * as solid from "../profileInfo";

describe("Solid Profile", () => {

  test("Get friend profile", async() => {

    const inruptFriendWebId = "http:/friend.inrupt.net/fakeUrl";
    const communityFriendWebId = "http:/friend.solid.community/fakeUrl";
    const otherFriendWebId = "http:/friend.custom/profile/fakeUrl";

    const targetInruptFriendWebId = "http:/friend.inrupt.net/profile/card#me";
    const targetCommunityFriendWebId = "http:/friend.solid.community/profile/card#me";
    const targetOtherFriendWebId = "http:/friend.custom/profile/card#me";

    expect(solid.getFriendProfile(inruptFriendWebId)).toEqual(targetInruptFriendWebId);
    expect(solid.getFriendProfile(communityFriendWebId)).toEqual(targetCommunityFriendWebId);
    expect(solid.getFriendProfile(otherFriendWebId)).toEqual(targetOtherFriendWebId);

  });

});

