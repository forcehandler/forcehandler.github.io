$(function () {

var table;
var click = 0;

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
    var collectionRef = firestore.collection("collection");

    $("#loadTable").click(function () {
        click++;
        collectionRef.get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                console.log(doc.data());
                //console.log(doc.id + ": " + doc.data());
                 //var obj = genObj(doc);
                 //console.log(obj);
                //var innerArr =  genInnerArray(doc)
                generateArray(doc.data());
                //console.log(array);
                //getdata(doc);
            });
            var col_headers = genColHeaders(array);
            console.log("headers: ", col_headers );
            if(click == 1) {
                setTableData(col_headers, array);
            }
            else{
                refreshTableData(col_headers, array);
            }
           //addDataToTable();
        });
        console.log(array);
    });


    var array = [];
    function generateArray(doc){
        array.push(doc);
    }

    function setTableData(col_headers, array) {
        console.log("Setting table data");
        table = $('#example').DataTable({
            data: array,
            /*columns: [
                {data: 'name'},
                {data: 'phone'}
            ]*/
            "columns": col_headers,
            colReorder: {
                realtime: true
            }
        });
    }

    function refreshTableData(col_headers, array){
        console.log('refreshTableData');

        $('#example').DataTable().destroy();
        $('#example').empty();
        $('#example').DataTable({
            data: array,
            /*columns: [
                {data: 'name'},
                {data: 'phone'}
            ]*/
            "columns": col_headers,
            colReorder: {
                realtime: true
            }
        });
    }

    //var row = "";

    /*function getdata(doc) {
        row += '<tr>';
        for (x in doc.data()) {
            row += '<td>' + doc.data()[x];
            console.log(x + ": " + doc.data()[x]);
            row += '</td>'
        }
        row += '</tr>'
        console.log(row);
    }

    function addDataToTable() {
        $("#table").append(row);
        /!*$("p").click(function(){
            $(this).hide();
        });*!/
    }*/


    /*https://stackoverflow.com/questions/39644079/how-to-display-the-column-headers-dynamically-in-jquery-data-table*/

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


    //####################################################################################
/*https://stackoverflow.com/a/30191827/6544607*/


    $('#example tbody').on('click', 'tr', function () {
        console.log(table.row(this).data());
        var date = table.row(this).data()['phone'];
        console.log('phone', date);
    });



});