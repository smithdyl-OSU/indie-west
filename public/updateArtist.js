// uses ajax to update an artist from the database based on the inputted id
function updateArtist(id) {
    $.ajax({
        type: "POST",
        url: "/artists/" + id,
        data: $('#update-artists').serialize(),
        success: function (result) {
            window.location.replace('./');
        }
    });
}