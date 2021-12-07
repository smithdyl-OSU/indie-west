// searches table for album matching input
function searchAlbum() {
    // Declare variables
    var input, filter, table, row, cell, i, text;
    input = document.getElementById("albumSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("albumTable");
    row = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < row.length; i++) {
        cell = row[i].getElementsByTagName("td")[1];
        if (cell) {
            text = cell.textContent || cell.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                row[i].style.display = "";
            } else {
                row[i].style.display = "none";
            }
        }
    }
}
