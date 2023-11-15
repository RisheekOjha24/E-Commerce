// Navbar resposive menu code

$(".ham").on("click", function() {
        $(".ham").hide();
        $(".nav_items").css("right",'0');
        setTimeout(function() {
            $(".cross").show();
        }, 400);
    });

    $(".cross").on("click", function() {
        $(".cross").hide();
        $(".nav_items").css("right",'-30rem');
        $(".ham").show();
    });

// Ajax
$(document).ready(function () {
    $('.loadProducts').click(function () {
        // Load "products.html" into the content container
        $('#content-container').load('products.html');
        $('#boss').css('display', 'none');
    });

    $('.home').click(function () {
        // Remove the content from the content container
        $('.main-3').empty();
    });
});
