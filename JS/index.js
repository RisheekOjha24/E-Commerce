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






// // remove admin logo and place username code
// $(document).ready(function () {
//     // Check if the user is logged in
//     var isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
//     if (isLoggedIn === 'true') {
//       // User is logged in, fetch and display user's name
//       var userName = sessionStorage.getItem('userName');
  
//       // Remove the image element
//       $('#admin-link img').remove();
  
//       // Append the username element to the <a> tag
//       $('#admin-link').text(userName);
//       $('#admin-link').css({

//             "font-size": "20px",
//             "margin": "0",
//             "padding": "0",
//             "position": "relative",
//             "top":"-12px",
//             "background": "red",
//             "font-family":"Poppins"
//       })    
//     }
//   });
    