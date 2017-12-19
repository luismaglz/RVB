export class GoogleTokenUtilities {
    private static auth2;
    private static googleUser; // The current user.

    public static appStart(callback: Function) {
        gapi.load('auth2', GoogleTokenUtilities.initSigninV2.bind(this, callback));
    }

    private static initSigninV2(callback: Function) {
        GoogleTokenUtilities.auth2 = gapi.auth2.init({
            client_id: '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com',
            scope: 'profile'
        });

        // Listen for changes to current user.
        GoogleTokenUtilities.auth2.currentUser.listen(callback);

        // Sign in the user if they are currently signed in.
        if (GoogleTokenUtilities.auth2.isSignedIn.get() === true) {
            GoogleTokenUtilities.auth2.signIn();
        }
    }
}
