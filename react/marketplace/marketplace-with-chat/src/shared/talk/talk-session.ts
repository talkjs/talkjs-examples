import * as Talk from 'talkjs';

import { Deferred } from "../utils/deferred.util";
import { User } from '../models/user.model';
import { appId, createTalkUser } from '../utils/talk.util';

const sessionDeferred = new Deferred<Talk.Session>();

export async function initialize(user: User) {
    await Talk.ready;

    sessionDeferred.resolve(new Talk.Session({
        appId: appId,
        me: await createTalkUser(user)
    }));
}

export function get() : Promise<Talk.Session> {
    return sessionDeferred.promise;
}