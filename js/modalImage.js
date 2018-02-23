$(function () {

    //$("p").text("aAo");
    var config = {
        apiKey: "AIzaSyAaAyo1xJZTUCSlPG4oFP03i7IbMuShyw4",
        authDomain: "visit-ecb67.firebaseapp.com",
        databaseURL: "https://visit-ecb67.firebaseio.com",
        projectId: "visit-ecb67",
        storageBucket: "visit-ecb67.appspot.com",
        messagingSenderId: "597114606341"
    };
    firebase.initializeApp(config);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var imgPathReference = storage.ref('q6lMwYqKmkRbyWBe2FAahZz14Ok2/Enquiry_workflow/Smile_for_the_camera!/1518349309908');

    imgPathReference.getDownloadURL().then(function(url) {
        console.log("url", url);
        //$('.modal-content').append('<img style="width:256px;height:256px;" id="' + imageID1 + '" src="' + url + '" />');
        $("p").text("YOLO!");
        $('.modal-content').append('<img style="width:256px;height:256px;" id="bhola" src="' + url + '" />');
    }).catch(function(error) {
        // Handle any errors
    });

    $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                //alert("Ready");
                console.log(modal, trigger);
                $(".modal-content").click(function () {
                    alert("click");
                    //$("p").text("YOLO!");
                });
            },
            complete: function() { alert('Closed'); } // Callback for Modal close
        }
    );
});