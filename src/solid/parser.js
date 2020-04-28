import { getRouteCommentsFile } from "./routes";
import { deepClone } from "../utils/functions";
/**
 * Returns a new notification in JSON form.
 */
export function getNewNotification(routeUri, sharerName, receiverName) {
  return {
    "@context": {
      "@version": 1.1,
      as: "https://www.w3.org/ns/activitystreams#",
      viade: "http://arquisoft.github.io/viadeSpec/",
      notification: {
        "@id": "as:Offer",
      },
    },
    notification: {
      actor: {
        type: "Person",
        name: sharerName,
      },
      object: {
        type: "viade:route",
        uri: routeUri,
      },
      target: {
        type: "Person",
        name: receiverName,
      },
    },
  };
}

/**
 * Returns a new comments file for a route in JSON form.
 */
export function getNewCommentsFile(routeUrl) {
  return {
    "@context": {
      "@version": 1.1,
      viade: "http://arquisoft.github.io/viadeSpec/",
      schema: "http://schema.org/",
      comments: {
        "@container": "@list",
        "@id": "viade:comments",
      },
    },
    routeUri: routeUrl,
    comments: [],
  };
}

/**
 * Returns a new comment file in JSON form.
 */
export function getNewComment(author, commentText, year, month, day) {
  return {
    /*
    "@context": {
      "@version": 1.1,
      viade: "http://arquisoft.github.io/viadeSpec/",
      schema: "http://schema.org/",
      dateCreated: {
        "@id": "viade:dateCreated",
        "@type": "xsd:date",
      },
      text: {
        "@id": "viade:text",
        "@type": "xsd:string",
      },
    },
    text: commentText,
    dateCreated: year + "-" + month + "-" + day,
    */
    author: author,
    text: commentText,
    dateCreated: year + "-" + month + "-" + day,
  };
}

/**
 * Returns a route in JSON-LD form as a string from the given route object, the webId of the pod's user and
 * the file name of the route for the pod.
 */
export function getFormattedRoute(routeObject, userWebId, fileName) {
  console.log(routeObject);
  let output = {
    "@context": {
      "@version": "1.1",
      comments: {
        "@id": "viade:comments",
        "@container": "@list",
      },
      description: {
        "@id": "schema:description",
        "@type": "xsd:string",
      },
      media: {
        "@container": "@list",
        "@id": "viade:media",
      },
      name: {
        "@id": "schema:name",
        "@type": "xsd:string",
      },
      points: {
        "@container": "@list",
        "@id": "viade:points",
      },
      latitude: {
        "@id": "schema:latitude",
        "@type": "xsd:double",
      },
      longitude: {
        "@id": "schema:longitude",
        "@type": "xsd:double",
      },
      elevation: {
        "@id": "schema:elevation",
        "@type": "xsd:double",
      },
      author: {
        "@id": "schema:author",
        "@type": "@id",
      },
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      schema: "http://schema.org/",
      viade: "http://arquisoft.github.io/viadeSpec/",
      xsd: "http://www.w3.org/2001/XMLSchema#",
    },
    name: routeObject.name,
    author: routeObject.author,
    description: routeObject.description,
    media: [],
    comments: getRouteCommentsFile(userWebId, fileName),
    waypoints: routeObject.positions,
    points: routeObject.positions.map((position) => {
      return { latitude: position[0], longitude: position[1] };
    }),
  };
  console.log(output, "output");
  return output;
}

/**
 * Returns a new shared routes file in JSON form.
 */
export function getNewSharedRoutesFileContent() {
  return {
    "@context": {
      "@version": 1.1,
      routes: {
        "@container": "@list",
        "@id": "viade:routes",
      },
      viade: "http://arquisoft.github.io/viadeSpec/",
    },
    routes: [],
  };
}

export function giveOwnFolderPermissions(folderURI) {
  let profile = folderURI.split("/viade")[0] + "/profile/card#me";
  let content =
    `

@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
<#owner>
    a acl:Authorization;
    acl:agent
        <` +
    profile +
    `>;
    acl:accessTo <./>;
    acl:default <./>;
    acl:mode
        acl:Read, acl:Write, acl:Control.`;
  return content;
}

export async function getNotification(fc, notificationFile) {
  let parsed = JSON.parse(await fc.readFile(notificationFile.url));
  console.log(notificationFile.url);
  let sharer = parsed.notification.actor.name;
  let content = parsed.notification.object.uri.split("/");
  content = content[content.length - 1];
  return {
    text: sharer + " has shared " + content + " with you",
  };
}
