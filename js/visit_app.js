$(function () {

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
    var workflowRef;


    const loadDataButton = document.getElementById("loadButton");

    // ########################################################################################################################

    function initFirestoreDbRef(user) {
        visitorRef = firestore.collection("institutes").doc(user.uid).collection("visitors");
        testRef = firestore.collection("institutes").doc(user.uid).collection("test").doc("first");
        workflowRef = firestore.collection("institutes").doc(user.uid).collection("workflows");
    }

    // direct to login function
    function loginPage() {
        window.location.replace("index.html");
    }

    // user login state obeserver

    firebase.auth().onAuthStateChanged(function (user) {
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
            showWorkflowButtons();
            // ...
        } else {
            // User is signed out.
            // ...
            loginPage();

        }
    });


    // Logout

    $("#logoutButton").click(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            loginPage();

        }, function (error) {
            // An error happened.
        });
    });

//############################################################################################################################

    /*obtain all the workflow names*/
    $("#loadButton").click(function () {
        workflowRef.get().then(function (snapshot) {
            snapshot.forEach(function (workflow) {
                //addWorkflowButton(workflow.id);
                addBtn(workflow.id);
            });
        });
    });

    function showWorkflowButtons(){
        workflowRef.get().then(function (snapshot) {
            snapshot.forEach(function (workflow) {
                //addWorkflowButton(workflow.id);
                addBtn(workflow.id);
            });
        });
    }

    function addWorkflowButton(title) {
        var r = $('<input type="button" value="' + title + '"/>');
        $("body").append(r);
    }

    //####################################################################################3

    /*https://stackoverflow.com/questions/20253246/adding-click-event-for-a-button-created-dynamically-using-jquery/20253294#20253294*/
    // Add workflow buttons to the div element "pg_workflow_buttons"
    var div = $('<div />', {'data-role': 'fieldcontain'})

    function addBtn(title) {
        var btn1 = $('<input />', {
            type: 'button',
            value: title,
            id: 'btn_b',
            on: {
                click: function () {
                    //alert(this.value);
                    getVisitors(this.value);
                }
            }
        });
        div.append(btn1).appendTo($('#pg_workflow_buttons'));
    }

    function getVisitors(workflow_name) {
        // gets all the visitors in the workflow
        var data = []; // stores list of json objects
        var visitorCollRef = workflowRef.doc(workflow_name).collection("visitors");
        visitorCollRef.get().then(function(visitorsList){
            visitorsList.forEach(function(visitorDoc){
                console.log(visitorDoc.id, visitorDoc.data());
                data.push(visitorDoc.data());
            });
            var col_headers = genColHeaders(data);
            setTableData(col_headers, data);
        });
    }

    //##################################################################################################

    // data generation part

    function genColHeaders(arr) {
        var col_headers = [];
        $.each(arr[0], function (key, value) {
            var my_item = {};
            my_item.data = key;
            my_item.title = key;
            col_headers.push(my_item);
        })
        return col_headers;
    }

    // ##############################################################################################

    // Table handling part

    function setTableData(col_headers, array) {
        console.log("Setting table data");
        $('#table').DataTable({
            data: array,
            /*columns: [
                {data: 'name'},
                {data: 'phone'}
            ]*/
            "columns": col_headers,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
    }

});