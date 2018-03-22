$(document).ready(function() {

   
    var table = $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            /*render: function(data, type, row){
                return '$' + data;
            }*/
            "data": null,
            "defaultContent": "<button>Click!</button>"
        }]
    } );

    $("#example tbody").on('click', 'button', function(){
        /*var data = table.row($(this).parents('tr')).data();
        table.row($(this).parents('tr')).remove().draw();*/
        //console.log(data);
        alert('clcik');
    })
    
    table.column(':contains(Quantity)').visible(true);
} );