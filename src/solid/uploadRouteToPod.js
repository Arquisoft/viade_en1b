import { useLDflexValue } from '@solid/react';
import data from '@solid/query-ldflex' ;

export async function uploadRouteToPod(newRoute) {
    await data.user.nick.add(newRoute);
}
