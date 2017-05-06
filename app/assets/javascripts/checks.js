




jQuery(document).on("turbolinks:load",function(){
jQuery(document).ready(function () {

   
    if ($('.mainmyorddiv').length > 0) {

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

var allts={
    pending:repl`<div class="ui large label" id="order_stat_${'id'}">
                    <i class="wait icon"></i> <span >Pending </span>
                  </div>`,
canceled:
                repl`<div class="ui large red label" id="order_stat_${'id'}" >
                    <i class="remove icon"></i> <span> Canceled </span>
                    
                    </div>`,
processing:repl`<div class="ui large blue label" id="order_stat_${'id'}" >
                    <i class="settings icon"></i> <span > Processing </span>
                  </div>`,

completed:repl` <div class="ui large green label" id="order_stat_${'id'}">
                    <i class="check icon"></i> <span> Completed </span>
                  </div>`


}
           window.addEventListener('order_updated_state', function (e) { 

            console.log(e.detail.id);
            $('#cancel_ord_' + e.detail.id).remove();
            console.log(e.detail.status);
            $('#order_stat_' + e.detail.id).replaceWith(

allts[e.detail.status]({'id':e.detail.id})


            );

});



        function cancelcallback(itemt) {

            var id = $(itemt).data('tordid')
            console.log(itemt);
            console.log(id);
            $('#cancel_ord_' + id).remove();
            $('#order_stat_' + id).replaceWith(


               allts.canceled({'id':id})


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





        $(".mainmyorddiv").on("click", '.canceldiv button', tocancel)


















    }
})
})