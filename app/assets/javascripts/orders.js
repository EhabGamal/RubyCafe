var arr;
jQuery(document).ready(function() {
    $('.ui.accordion').accordion();
    $.ajax({
        url: "/products.json",
        success: function(data) {
            console.log(data);
            arr = data;
        },
        error: function(error) {
            console.log(error);
        }
    });
    $('#order_room_id').attr('class','search selection dropdown');
    $('#product_category_id').attr('class','search selection dropdown');
    $('#product_category_id').attr('multiple','');
    $('#order_user_id').attr('class','search selection dropdown');
    $('#order_room_id').dropdown();
    $('#product_category_id').dropdown();
    $('#order_user_id').dropdown();
});

