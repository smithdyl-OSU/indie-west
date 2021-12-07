// deletes an album_owner from the database

function deleteAlbumOwner(id) {
    $.ajax({
        url: '/album_owners/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}