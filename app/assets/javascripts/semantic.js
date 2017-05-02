/**
 * Created by salamaashoush on 02/05/17.
 */
jQuery(document).ready(function() {
    $('.message .close')
        .on('click', function () {
            $(this)
                .closest('.message')
                .transition('fade');
        });
});