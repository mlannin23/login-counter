$(document).ready(function () {
    $("#form").validate({
        rules: {
            username: {
                required: true,
                minlength: 1,
                maxlength: 128
            },
            password: {
                maxlength: 128
            }
        }
    });
});
