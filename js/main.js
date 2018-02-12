	 // Initialize the FirebaseUI Widget using Firebase.
	 // FirebaseUI config.
      var uiConfig = {
        //signInSuccessUrl: '/visit_firestore.html',    // for uploading to github pages

        signInSuccessUrl: 'visit_firestore.html',     // for localhost
        signInOptions: [
        	  /*provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		      requireDisplayName: false*/
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          /*firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,*/
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        //tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);