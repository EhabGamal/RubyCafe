// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

jQuery(document).on("turbolinks:load",function () {
    if(!$(".pages.index").length > 0){
        return
    }
    App.Channels.Products.subscribe()
});