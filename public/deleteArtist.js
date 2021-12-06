// deletes an artist from the database

function deleteArtist(id) {
    $.ajax({
        url: '/artists/' + id,
        type: 'DELETE',
        success: function(result) {
            window.location.reload(true);
        }
    })
}