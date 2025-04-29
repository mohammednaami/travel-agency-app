import { OAuthProvider, Query } from "appwrite"
import { account, appwriteConfig, database } from "./client"
import { redirect } from "react-router"

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google)
    } catch (e) {
        console.error("loginWithGoogle", e)
    }
}

export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) {
            return redirect("/sign-in");
        }
        const { documents } = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal("accountId", user.$id),
            Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"])
        ])
    } catch (e) {
        console.error(e)
    }
}
export const getGooglePicture = async () => {
    try {
        const session = await account.getSession('current');

        const oAuthToken = session.providerAccessToken;

        if (!oAuthToken) {
            throw new Error("No OAuth token found");
        }
        const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=photos", {
            headers: {
                Authorization: `Bearer ${oAuthToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile photo from Google People API");
        }

        const data = await response.json();
        const photoUrl = data.photos && data.photos.length > 0 ? data.photos[0].url : null;
        return photoUrl;


    } catch (e) {
        console.error("getGooglePicture", e);
        return null
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.error("logoutUser", e);
        return false;
    }
}



export const storeUserData = async () => {
    try {

    } catch (e) {
        console.error(e)
    }
}

export const getExistingUser = async () => {
    try {

    } catch (e) {
        console.error(e)
    }
}