$(function(){

  var config = {
    apiKey: "AIzaSyAaAyo1xJZTUCSlPG4oFP03i7IbMuShyw4",
    authDomain: "visit-ecb67.firebaseapp.com",
    databaseURL: "https://visit-ecb67.firebaseio.com",
    projectId: "visit-ecb67",
    storageBucket: "visit-ecb67.appspot.com",
    messagingSenderId: "597114606341"
  };
  firebase.initializeApp(config);

  var firestore = firebase.firestore();

  var loggeduser = firebase.auth().currentUser;

  var visitorRef;
  var testRef;
  const loadDataButton = document.getElementById("loadButton");
  
  // ########################################################################################################################

  function initFirestoreDbRef(user){
    visitorRef = firestore.collection("institutes").doc(user.uid).collection("visitors");
    testRef = firestore.collection("institutes").doc(user.uid).collection("test").doc("first");
  }

  // direct to login function
  function loginPage(){
    window.location.replace("index.html");
  }
  // user login state obeserver

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $("#username").text(displayName);
      $("#uid").text(uid);

      initFirestoreDbRef(user);
      // ...
    } else {
      // User is signed out.
      // ...
      loginPage();

    }
  });
  

  // Logout

  $("#logoutButton").click(function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
     loginPage();

    }, function(error) {
      // An error happened.
    });
  });

//############################################################################################################################

  // obtain data from the firestore database of the user
  loadDataButton.addEventListener("click", function(){
    console.log("clicked");
      visitorRef.get().then(function(snapshot){
          snapshot.forEach(function(doc){
            console.log(doc.data());
            for(x in doc.data()){
              console.log(x + ": " + doc.data()[x]);
              var workflow = doc.data()[x];
              if(workflow != null){
                for(y in workflow){
                  console.log(y + ": " + workflow[y]);
                  addWorkflowButton(y);
                  var pageData = workflow[y];
                  for(z in pageData){
                    console.log(z + ": " + pageData[z]);
                    var pageDataItems = pageData[z];
                    for(u in pageDataItems){
                      console.log(u + ": " + pageDataItems[u]);
                      var results = pageDataItems[u];
                      for(v in results){
                        console.log(v + ": " + results[v]);
                      }
                    }
                  }
                }
              }
            }
          });
          
      });
  });

  function addWorkflowButton(title){
    var r= $('<input type="button" value="' + title + '"/>');
        $("body").append(r);
  }

});