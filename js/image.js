$(function () {
    $('.carousel.carousel-slider').carousel({fullWidth: true});
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
        var img = document.getElementById('myimg');
        img.src = url;
    }).catch(function(error) {
        // Handle any errors
    });
});