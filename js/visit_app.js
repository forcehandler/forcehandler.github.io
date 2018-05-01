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
    var storage = firebase.storage();

    var loggeduser = firebase.auth().currentUser;

    var visitorRef;
    var testRef;
    var workflowRef;

    var table;
    var currentWorkflowName;

    var loadDataButton = document.getElementById("loadButton");

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

    function showWorkflowButtons() {
        workflowRef.get().then(function (snapshot) {
            snapshot.forEach(function (workflow) {
                //addWorkflowButton(workflow.id);
                addBtn(workflow.id);
            });
            /*hide loader when buttons are loaded*/

            console.log("hiding loader on buttons load");
            $("#loader-circle").hide();
        });
    }

    //####################################################################################3

    /*https://stackoverflow.com/questions/20253246/adding-click-event-for-a-button-created-dynamically-using-jquery/20253294#20253294*/
    // Add workflow buttons to the div element "pg_workflow_buttons"
    var div = $('<div />', {
        'data-role': 'fieldcontain'
    })

    /*function addBtn(title) {
        var btn1 = $('<input />', {
            type: 'button',
            value: title,
            id: 'btn_b',
            on: {
                click: function () {
                    //alert(this.value);
                    currentWorkflowName = this.value;
                    getVisitors(this.value);
                }
            }
        });
        div.append(btn1).appendTo($('#pg_workflow_buttons'));
    }*/

    function addBtn(title) {
        var btn1 = $('<a/>', {
            class: 'waves-effect waves-light btn',
            text: title,
            id: 'btn_b',
            on: {
                click: function () {
                    //alert(this.value);
                    currentWorkflowName = this.text;
                    getVisitors(currentWorkflowName);
                    if (table != null) {    // logic to refresh the table on creating new table
                        table.destroy();
                        $("#table").empty();       // clear the columns
                    }
                    /*show loader when the workflow is selected*/
                    console.log("Showing loader on button click");
                    $("#loader-circle").show();
                }
            }
        });
        div.append(btn1).appendTo($('#workflow_btns')); //append the div containing btn1 to workflow_btns
    }

    function getVisitors(workflow_name) {
        // gets all the visitors in the workflow
        var data = []; // stores list of json objects
        var visitorCollRef = workflowRef.doc(workflow_name).collection("visitors");
        visitorCollRef.get().then(function (visitorsList) {
            visitorsList.forEach(function (visitorDoc) {
                var obj = visitorDoc.data();

                var myDate = new Date(visitorDoc.id * 1);
                var date = myDate.toLocaleString();

                obj["Date"] = date;
                obj["ID"] = visitorDoc.id * 1;

                console.log(visitorDoc.id, obj);

                data.push(obj);
            });
            //var col_headers;
            newGenColHeaders(workflow_name).then(function (col_headers) {
                setTableData(col_headers, data);
            });

        });
    }

    function getPhotosFolders(visitor_id) {
        var promise = new Promise(function (resolve, reject) {
            var photoDocRef = workflowRef.doc(currentWorkflowName).collection("visitors")
                .doc(visitor_id + "").collection("photos").doc(visitor_id + "");

            photoDocRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    var folderList = [];
                    for (var x in doc.data()) {
                        folderList.push(x);
                    }
                    //addPhotos(folderList, visitor_id);
                    resolve(folderList);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    reject("Could not get folder list");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
                reject('Error occurred');
            });
        });

        return promise;
    }

    function addPhotos(foldersName, visitor_id) {
        console.log("Adding images for id", visitor_id);
        for (var i in foldersName) {
            var uid = firebase.auth().currentUser.uid;
            var path = uid + '/' + currentWorkflowName + '/' + foldersName[i] + '/' + visitor_id;
            console.log("image path ", path);
            var imgPathReference = storage.ref(path);

            imgPathReference.getDownloadURL().then(function (url) {
                console.log("url", url);
                $('#modal-images').append('<img style="width:256px;height:256px;" id="' + foldersName[i] + '" src="' + url + '" />');
            }).catch(function (error) {
                // Handle any errors
            });
        }
    }

    //##################################################################################################

    // data generation part

    // Remove it
    /*function genColHeaders(arr) {
        var col_headers = [];
        $.each(arr[0], function (key, value) {
            var my_item = {};
            my_item.data = key;
            my_item.title = key;
            col_headers.push(my_item);
        })

        console.log("col1", col_headers);
        return col_headers;
    }*/

    function newGenColHeaders(workflow_name) {
        var promise = new Promise(function (resolve, reject) {
            workflowRef.doc(workflow_name).get()
                .then(function (doc) {
                    var ques = doc.data()['questions'];
                    console.log(ques);
                    var col_headers = [];
                    col_headers.push({
                        data: "ID",
                        title: "ID"
                    });
                    for (key in ques) {
                        var my_item = {};
                        my_item.data = ques[key];
                        my_item.title = ques[key];
                        col_headers.push(my_item);
                    }
                    col_headers.push({
                        data: "Date",
                        title: "Date"
                    });
                    
                    col_headers.push({
                        data: "Actions",
                        title: "Action"
                    });
                    console.log("col2", col_headers);
                    resolve(col_headers);
                });
        });

        return promise;
    }
    // ##############################################################################################

    // Table handling part

    function setTableData(col_headers, array) {
        console.log("Setting table data");
        table = $('#table').DataTable({
            data: array,
            "order": [[ 0, "desc" ]],
            /*columns: [
                {data: 'name'},
                {data: 'phone'}
            ]*/
            "columns": col_headers,
            "columnDefs": [{
                "targets": -1, // target the last row i.e. Actions
                "data": null,
                "defaultContent": "<button>Delete</button>"
            }],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
        console.log("hiding loader after loading table");
        $("#loader-circle").hide();
    }


    //###############################################################################################

    /*https://stackoverflow.com/a/30191827/6544607*/

    $('#table ').on('click', 'tr', function () {
        console.log(table.row(this).data());
        var id = table.row(this).data()['ID'];
        console.log('clicked ID', id);
        
        // get all the images from storage
        // get list of folder names where the photos are present
        // current workflow name in in currentWorkflowName variable

        //clear all the current images 
        $('#modal-images').empty();
        getPhotosFolders(id).then(function (folders) {
            console.log(folders);
            if(Array.isArray(folders) && folders.length){
                addPhotos(folders, id);
                openModal(id);
            }
            else {
                console.log("No photos found!!")
            }
            
        });
    });

    $("#table ").on('click', 'button', function (e) {
        var data = table.row($(this).parents('tr')).data();
        console.log("deleting", data);
        e.stopPropagation(); //prevent the click to bubble up to tr
        // delete the visitor from currentWorkflowName workflow
        if(confirm('Delete')){
            deleteVisitor(data);
            table.row($(this).parents('tr')).remove().draw();
        }
        else{
            alert('Cancel delete');
        }
    });
    
    //#############################################################################

    function deleteVisitor(visitor){
        workflowRef.doc(currentWorkflowName).collection("visitors").doc(visitor.ID+"").delete().then(function(){
            console.log("visitor: " + visitor.ID + " successfully deleted from " + currentWorkflowName);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    //############################################################################3
    // Modal Dialog for images

    function openModal(id) {
        $('#modal1').modal('open');
        $('.modal-content p').text(id);
    }

    $('.modal').modal();

});
