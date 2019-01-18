$(document).ready(function () {
    var loading = visionComponents.loading('body', {
        loader: 'line-spin-fade-loader'
    });
    var offset = new Date().getTimezoneOffset();
    $.ajax({
        url: BASE_URL + "timezone",
        method: "POST",
        data: {
            "offset": offset
        },
        dataType: "json",
        beforeSend: function () {},
        success: function (response) {
            if (response) {
                if (response.success) {
                } else {
                    swal('Error!', response.msg, 'error');
                }
            } else {
                swal('Error!', "Invalid Request!", 'error');
            }
        },
        error: function (jqXHR, textStatus) {
            swal('Error!', "Invalid Request!", 'error');
        },
        complete: function () {
            loading.remove();
        }
    });
});