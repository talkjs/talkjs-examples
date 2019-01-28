import { AsyncStorage } from "react-native";
import { User } from "../../shared/models/user.model";

const USER_TOKEN_STORAGE_ITEM_NAME = 'userToken'

export function removeAuthentication(): Promise<void> {
    return AsyncStorage.removeItem(USER_TOKEN_STORAGE_ITEM_NAME);
}

export function authenticate(user: User): Promise<void> {
    return AsyncStorage.setItem(USER_TOKEN_STORAGE_ITEM_NAME, 'user_' + user.id);
}

/**
 * Returns the id of the authenticated user if the user is authenticated.
 * Returns -1 if the user is not authenticated.
 */
export async function getAuthenticatedId(): Promise<number> {
    const storageValue = await AsyncStorage.getItem(USER_TOKEN_STORAGE_ITEM_NAME);

    return storageValue ? Number(storageValue.split('_')[1]) : -1;
}