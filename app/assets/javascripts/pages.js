// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

jQuery(document).on("turbolinks:load", function () {
    if (!$(".sessions.new").length > 0) {
        return
    }
    $('.ui.checkbox').checkbox();
});