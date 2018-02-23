$(document).ready(function() {

    var table = $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );

    table.column(':contains(Quantity)').visible(false);
} );