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


  import prodList from './pdetails.js';
// Fetch product details based on product ID from URL
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('pid');
var productType = urlParams.get('type');  // Add this line to get the product type

// Check if productId and productType are valid
if (productId && productType && prodList[productType] && prodList[productType][productId]) 
{
  var product = prodList[productType][productId];

  // Update the content in s1product.html dynamically
  $('.pname').text(product.name);

  $('.ptag1').text("₹" + product.oprice.toFixed(2));
  $('.ptag2').text("₹" + product.nprice.toFixed(2));
  // Discount calculation
  var discountPercentage = ((product.oprice - product.nprice) / product.oprice) * 100;
  $('.ptag3').text("- " + discountPercentage.toFixed(2) + "%");

  $('.main-img img').attr('src', prodList[productType][productId].mainImg);

  // Update small images
  $('.sm-img1').attr('src', prodList[productType][productId].smallImg1);
  $('.sm-img2').attr('src', prodList[productType][productId].smallImg2);
  $('.sm-img3').attr('src', prodList[productType][productId].smallImg3);

  // Product Description
  $('.description').text(product.description);

  //Image coding part started ----------------------------------------------------------------

  $('.sm-img1').css('border', '2px solid black'); //default border on first small image when page reloads
  //replace small images with main image when user clcik on small image
  $('.small-img').on('click', function(e) {
    // Prevent the default behavior of the click event (preventing the page from scrolling)
    e.preventDefault();

    // Remove the black border from all small images
    $('.small-img').css('border', 'none');
    // Get the source of the clicked small image
    var smallImgSrc = $(this).attr('src');
    
    // Set the main image source to the clicked small image
    $('.main-img img').attr('src', smallImgSrc);

       // Add a black border to the clicked small image
       $(this).css('border', '2px solid black');
  });

} else {
  // Handle invalid or missing productId or productType
  console.error('Invalid or missing product ID or product type');
}


    // Add to Cart button click event
    $("#addToCart").on('click', function () {
      // Fetch product details based on product ID from URL
      var urlParams = new URLSearchParams(window.location.search);
      var productId = urlParams.get('pid');
      var productType = urlParams.get('type');

      // Check if productId and productType are valid
      if (productId && productType && prodList[productType] && prodList[productType][productId]) {
          var product = prodList[productType][productId];

          // Create a cart item object
          var cartItem = {
              id: productId,
              type: productType,
              name: product.name,
              price: product.nprice,
              quantity: parseInt($("#num").val()),
              image: $('.sm-img1').attr('src')
          };

          // Fetch existing cart items from localStorage
          var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

          // Check if the item is already in the cart
          var existingItemIndex = cartItems.findIndex(item => item.id === productId && item.type === productType);
          if (existingItemIndex !== -1) {
              // If the item is already in the cart, update the quantity
              cartItems[existingItemIndex].quantity += cartItem.quantity;
          } else {
              // If the item is not in the cart, add it
              cartItems.push(cartItem);
          }

          // Save the updated cart items back to localStorage
          localStorage.setItem('cart', JSON.stringify(cartItems));

          // Inform the user that the item has been added to the cart
          showNotification('product added to cart');
      } else {
          // Handle invalid or missing productId or productType
          console.error('Invalid or missing product ID or product type');
      }
  });






  function showNotification(message) {
    var notification = $('#custom-notification');
    notification.html(message);

    // Show notification
    notification.removeClass('hidden').addClass('show');

    // Hide notification after 5 seconds
    setTimeout(function () {
        notification.removeClass('show').addClass('hidden');
    }, 800);
}