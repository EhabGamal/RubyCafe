// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var kkk=0
jQuery(document).on("turbolinks:load", function () {
    if (!$(".sessions.new").length > 0) {
        return
    }
    $('.ui.checkbox').checkbox();



    $.ajax({
        url: "/orders.json",
        success: function (data) {
            console.log(data)
            ordersList = data;
            console.log(ordersList);
            temp = repl`
            <div class="item">
              <i class="${'icon'} large icon"></i>
              <div class="content">
                <div class="header">${'key'}</div>
              </div>
            </div>
            `;
            orderHeaders.forEach((val) => {
                console.log(temp({ icon: val.icon, key: Object.byString(ordersList[0], val.key) }))
            })
        },
        error: function (error) {
            console.log(error);
        }
    });











});