$(document).on('click', '.box', function () {
    // Check the background color of the clicked element
    var backgroundColor = $(this).css('background-color');

    // Check if the background color is pink (you can use RGB or HEX values)
    if (backgroundColor === 'rgb(255, 192, 203)') {
        // Change the background color to blue
        $(this).css('background-color', 'blue');
    }
});




