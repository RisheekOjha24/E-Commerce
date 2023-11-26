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

