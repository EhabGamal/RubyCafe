// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
jQuery(document).ready(function() {
    $('#products-table').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": $('#products-table').data('source'),
        "pagingType": "full_numbers",
        // optional, if you want full pagination controls.
        // Check dataTables documentation to learn more about
        // available options.
    });
});