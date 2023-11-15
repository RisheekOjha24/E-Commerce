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
//navbar meny ends

// product quanty selection increment - decrement starts----------------------------------------------------------------
$(function() {
    // Get the input element by its ID
    var numInput = $("#num");
  
    // Plus button click event
    $("#plus").on('click', function() {
      // Increment the value of the input field
      if (parseInt(numInput.val()) < 10) {
        numInput.val(parseInt(numInput.val()) + 1);
      }
    });
  
    // Minus button click event
    $("#minus").on('click', function() {
      // Ensure the value is not less than 1 before decrementing
      if (parseInt(numInput.val()) > 1) {
        numInput.val(parseInt(numInput.val()) - 1);
      }
    });
  });

  // product quanty selection increment - decrement  ends----------------------------------------------------------------