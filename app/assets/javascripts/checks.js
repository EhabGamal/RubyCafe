
jQuery(document).ready(function () {

    var reason = true
    if ($('.mainmyorddiv').length > 0) {







        function cancelcallback(itemt) {

            var id = $(itemt).data('tordid')
            console.log(itemt);
            console.log(id);
            $('#cancel_ord_' + id).remove();
            $('#order_stat_' + id).replaceWith(


                `<div class="ui large red label" id="order_stat_${id}" >
                    <i class="remove icon"></i> <span> Canceled </span>
                    
                    </div>`


            );


        }





        function changeorderstate(id, state, callback, itemt) {

            //console.log("INCH", id, state)
            $.ajax({
                type: "PUT",
                url: `/orders/${id}.json`,
                data: { order: { status: state } },
                dataType: 'json',
                success: function (msg) {
                    callback(itemt);
                },
                error: function (d) { console.log("LLLLLLL") },
                complete: function (d) { console.log("MESSSSSS") }
            });

        }
        function tocancel() {
            //console.log("INDONE")
            changeorderstate($(this).data('tordid'), 'canceled', cancelcallback, this)



        }



        function repl(strings, ...keys) {
            return (function (...values) {
                var dict = values[values.length - 1] || {};
                var result = [strings[0]];
                keys.forEach(function (key, i) {
                    var value = Number.isInteger(key) ? values[key] : dict[key];
                    result.push(value, strings[i + 1]);
                });
                return result.join('');
            });
        }


        $(".mainmyorddiv").on("click", '.canceldiv button', tocancel)


















    }
})