// deletes an album from the database

function deleteAlbum(id) {
    $.ajax({
        url: '/albums/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}