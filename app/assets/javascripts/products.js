// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var table;
jQuery(document).ready(function() {
    table=$('#products-table').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": $('#products-table').data('source'),
        "pagingType": "full_numbers",
        // optional, if you want full pagination controls.
        // Check dataTables documentation to learn more about
        // available options.
    }).on('draw.dt',function (e) {
        $('.ui.checkbox').checkbox();
    });

    $('.message .close')
        .on('click', function () {
            $(this).closest('.message').transition('fade');
        });

});

jQuery(document).on("turbolinks:load",function () {
    if(!$(".products.landing").length > 0){
        return
    }
    App.Channels.Products.subscribe()
});
function toggle_available(toggle) {
    var productId=toggle.dataset.id;
    var state=(!JSON.parse(toggle.dataset.state))&1;

    $.ajax({
        url: '/admin/products/'+productId+'.json',
        method:'put',
        data:{product:{available:state}},
        success:function () {
            toggle.dataset.state=state;
        },
        error:function () {
            console.log("error")
        }
    });

}
