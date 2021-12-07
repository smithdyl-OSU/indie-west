// uses ajax to update an artist from the database based on the inputted id
function updateArtist(id) {
    $.ajax({
        type: "PUT",
        url: "/artists/" + id,
        data: $('#updateArtists').serialize(),
        success: function (result) {
            window.location.replace('./');
        }
    });
}