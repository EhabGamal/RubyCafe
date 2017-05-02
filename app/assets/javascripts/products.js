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
    $('.ui.checkbox').checkbox();
    $('.message .close')
        .on('click', function () {
            $(this)
                .closest('.message')
                .transition('fade');
        });

});
jQuery(document).on("turbolinks:load",function () {
    if(!$(".products.index").length > 0){
        return
    }
    App.Channels.Products.subscribe()
});
