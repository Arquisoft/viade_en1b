import { getWebId } from './auth'
const $rdf = require('rdflib')
const store = $rdf.graph()

export function uploadRouteToPod(newRoute) {
    let webId = getWebId() // ?? How to obtain the id?
    const me = store.sym('https://example.com/alice/card#me');
}

