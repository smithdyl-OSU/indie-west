// deletes an order from the database

function deleteOrder(id) {
    $.ajax({
        url: '/orders/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}