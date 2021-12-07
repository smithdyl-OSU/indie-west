// deletes an song from the database

function deleteSong(id) {
    $.ajax({
        url: '/songs/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}