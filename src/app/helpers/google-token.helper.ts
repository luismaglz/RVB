export class GoogleTokenUtilities{
    public static getTokenForCurrentUser():string{
        let gapi:any;
        if(gapi && gapi.auth2){
            const authInstance = gapi.auth2.getAuthInstance();
            if(authInstance && authInstance.currentUser){
                const currentUser = authInstance.currentUser.get();
                if(currentUser){
                    const authResponse = currentUser.getAuthResponse();
                    if(authResponse && authResponse.id_token){
                        return authResponse.id_token;
                    }
                }
            }
        }
        return null;
    }
}