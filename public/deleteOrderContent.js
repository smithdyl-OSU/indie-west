// deletes an order_content from the database

function deleteOrderContent(id) {
    $.ajax({
        url: '/order_contents/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}