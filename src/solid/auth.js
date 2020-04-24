import auth from "solid-auth-client";

export async function getWebId() {
    /* 1. Check if we"ve already got the user's WebID and access to their Pod: */
    let session = await auth.currentSession();
    if (session) {
      return session.webId;
    }
    return session;
}