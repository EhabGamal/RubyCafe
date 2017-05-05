// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
users_table = null;
jQuery(document).on("turbolinks:before-visit", function () {
    if(users_table){
        users_table.fnDestroy();
    }
});
jQuery(document).on("turbolinks:load", function () {
    if (!$(".users.index").length > 0) {
        return
    }
    users_table = $('#users-table').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": $('#users-table').data('source'),
        "pagingType": "full_numbers",
        // optional, if you want full pagination controls.
        // Check dataTables documentation to learn more about
        // available options.
    }).on('draw.dt', function (e) {
        $('.ui.checkbox').checkbox();
    });


});
