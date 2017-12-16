export class GoogleTokenUtilities {
    private static auth2;
    private static googleUser; // The current user.

    public static appStart() {
        gapi.load('auth2', GoogleTokenUtilities.initSigninV2);
    }

    private static initSigninV2() {
        debugger;
        GoogleTokenUtilities.auth2 = gapi.auth2.init({
            client_id: '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com',
            scope: 'profile'
        });

        // Listen for sign-in state changes.
        GoogleTokenUtilities.auth2.isSignedIn.listen(GoogleTokenUtilities.signinChanged);

        // Listen for changes to current user.
        GoogleTokenUtilities.auth2.currentUser.listen(GoogleTokenUtilities.userChanged);

        // Sign in the user if they are currently signed in.
        if (GoogleTokenUtilities.auth2.isSignedIn.get() === true) {
            GoogleTokenUtilities.auth2.signIn();
        }
    }


    /**
     * Listener method for sign-out live value.
     *
     * @param {boolean} val the updated signed out state.
     */
    private static signinChanged(val) {
        debugger;
    };

    /**
     * Listener method for when the user changes.
     *
     * @param {GoogleUser} user the updated user.
     */
    private static userChanged(user) {
        console.log('User now: ', user);
        GoogleTokenUtilities.googleUser = user;
        GoogleTokenUtilities.updateGoogleUser();
    };

    /**
     * Updates the properties in the Google User table using the current user.
     */
    private static updateGoogleUser = function () {
        debugger;
        if (GoogleTokenUtilities.googleUser) {
            const id = GoogleTokenUtilities.googleUser.getId();
            const scopes = GoogleTokenUtilities.googleUser.getGrantedScopes();
            const authResponsse = GoogleTokenUtilities.googleUser.getAuthResponse();
        }
    };

    /**
     * Retrieves the current user and signed in states from the GoogleAuth
     * object.
     */
    private static refreshValues = function () {
        debugger;
        if (GoogleTokenUtilities.auth2) {
            GoogleTokenUtilities.googleUser = GoogleTokenUtilities.auth2.currentUser.get();
            const isSignedIn = GoogleTokenUtilities.auth2.isSignedIn.get();
            GoogleTokenUtilities.updateGoogleUser();
            debugger;
        }
    }

    // public static getTokenForCurrentUser(): string {
    //     if (gapi) {
    //         gapi.load('auth2', GoogleTokenUtilities.initSigninV2);
    //         const authInstance = gapi.auth2.getAuthInstance();
    //         if (authInstance && authInstance.currentUser) {
    //             const currentUser = authInstance.currentUser.get();
    //             if (currentUser) {
    //                 const authResponse = currentUser.getAuthResponse();
    //                 if (authResponse && authResponse.id_token) {
    //                     return authResponse.id_token;
    //                 }
    //             }
    //         }
    //     }
    //     return null;
    // }

    // public static getCurrentUser(): any {
    //     if (gapi) {
    //         gapi.load('auth2', initSigninV2);
    //         const authInstance = gapi.auth2.getAuthInstance();
    //         if (authInstance && authInstance.currentUser) {
    //             const currentUser = authInstance.currentUser.get();
    //             if (currentUser) {
    //                 return currentUser.getBasicProfile();
    //             }
    //         }
    //     }
    //     return null;
    // }
}