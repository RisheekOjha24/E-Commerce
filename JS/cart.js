// Wait for the document to be ready
    // Navbar responsive menu code
    $(".ham").on("click", function () {
        $(".ham").hide();
        $(".nav_items").css("right", '0');
        setTimeout(function () {
            $(".cross").show();
        }, 400);
    });

    $(".cross").on("click", function () {
        $(".cross").hide();
        $(".nav_items").css("right", '-30rem');
        $(".ham").show();
    });
    // Function to generate HTML for a product in the cart
// Function to generate HTML for a product in the cart
function generateProductHTML(product) {
    var total = product.quantity * product.price; // Calculate total price based on quantity
    return `
        <div class="product">
            <input type="checkbox" class="product-checkbox" onchange="updateTotal()">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-quantity">
                    <button class="quantity-btn decrement" onclick="changeQuantity('${product.id}', -1)">&#x2796</button>
                    <span id="${product.id}-quantity">${product.quantity}</span>
                    <button class="quantity-btn increment" onclick="changeQuantity('${product.id}', 1)">&#x2795</button>
                    <div class="product-price" id="${product.id}-price">₹${total}</div> <!-- Display total price -->
                    <button class="remove-btn" onclick="removeItem(this)"><img src="../images/delete.png" alt="Remove"></button>
                </div>
            </div>
        </div>`;
}

function populateCart() {
    // Fetch cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear existing content in the cart
    $('.boss .product').remove();

    // Populate the cart with items
    cartItems.forEach(function (item) {
        var product = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image // Replace with actual image path or logic
        };

        // Append the generated HTML to the cart
        $('.boss').append(generateProductHTML(product));
    });

    // Update the total
    updateTotal();
}


// Initial population of the cart
populateCart();

function changeQuantity(productId, delta) {
    var quantityElement = $('#' + productId + '-quantity');
    var quantity = parseInt(quantityElement.text()) + delta;

    quantity = Math.min(10, Math.max(quantity, 1));

    quantityElement.text(quantity);

    updatePrice(productId, quantity);
    updateLocalStorage(); // Update local storage after changing quantity
    updateTotal();
}

function getProductDetails(productId) {
    // Fetch cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the product in the cart
    var product = cartItems.find(item => item.id === productId);

    return product;
}

function updatePrice(productId, quantity) {
    var priceElement = $('#' + productId + '-price');
    var product = getProductDetails(productId);
    var totalPrice = quantity * product.price;
    priceElement.text('₹' + totalPrice);
}

function removeItem(removeButton) {
    var product = $(removeButton).closest('.product');
    var productId = product.find('.product-quantity span').attr('id').split('-')[0];

    // Remove the item from the cart in the UI
    product.remove();

    // Remove the item from local storage
    removeFromLocalStorage(productId);

    // Update the total
    updateTotal();
}

function removeFromLocalStorage(productId) {
    // Fetch cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the item with the specified productId
    var index = cartItems.findIndex(item => item.id === productId);

    // Remove the item if found
    if (index !== -1) {
        cartItems.splice(index, 1);
        // Update localStorage with the modified cart items
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
}

function updateLocalStorage() {
    // Fetch cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Update each item's quantity in local storage
    $('.product').each(function () {
        var productId = $(this).find('.product-quantity span').attr('id').split('-')[0];
        var quantity = parseInt($(this).find('.product-quantity span').text());

        var index = cartItems.findIndex(item => item.id === productId);

        if (index !== -1) {
            cartItems[index].quantity = quantity;
        }
    });

    // Update localStorage with the modified cart items
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateTotal() {
    var total = 0;
    $('.product-checkbox:checked').each(function () {
        var product = $(this).closest('.product');
        var quantity = parseInt(product.find('.product-quantity span').text());
        var price = parseInt(product.find('.product-price').text().substring(1));
        total += price;
    });

    $('#cart-total').text('Total: ₹ ' + total);
}

function selectAll(selectAllCheckbox) {
    $('.product-checkbox').prop('checked', selectAllCheckbox.checked);
    updateTotal();
}

// Event handlers
// $('.boss').on('click', '.quantity-btn', function () {
//     var productId = $(this).closest('.product').find('.product-quantity span').attr('id').split('-')[0];
//     var isIncrement = $(this).hasClass('increment');
//     changeQuantity(productId, delta);
// }); 

$('.remove-btn').on('click', function () {
    removeItem(this);
});

$('.product-checkbox').on('change', function () {
    updateTotal();
});

$('#select-all').on('change', function () {
    selectAll(this);
});

// Code to store cart items from local storage to user specific firstore database.

const firebaseConfig = {
    apiKey: "AIzaSyCqc_mvK2Evq8nwCI6ammO-7fm9CzM-Hd8",
    authDomain: "auth-form-5cfc3.firebaseapp.com",
    projectId: "auth-form-5cfc3",
    storageBucket: "auth-form-5cfc3.appspot.com",
    messagingSenderId: "499103046125",
    appId: "1:499103046125:web:b651d029e1fa23466fafe4"
};

firebase.initializeApp(firebaseConfig);

// Function to check if the user is logged in
function isLoggedIn() {
    // Check if the 'isLoggedIn' flag is set in sessionStorage
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Function to get the authenticated user's ID
function getAuthenticatedUserId() {
    
    var userId = sessionStorage.getItem('uid');
    return userId;
   
}

// Event handler for the "Save Cart" button
$('#save-cart').on('click', function () {
    // Check if the user is logged in
    if (isLoggedIn()) {
        
        showNotification('Your items are saved!');
        // Get the authenticated user's ID
        var userId = getAuthenticatedUserId();
      
        // Access the user's 'Cart' collection in Firestore
        var userCartRef = firebase.firestore().collection('UserDetails').doc(userId).collection('Cart');

        // Retrieve cart items from local storage
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear existing cart data in Firestore
        userCartRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });

            // Add new cart items to Firestore
            cartItems.forEach((item) => {
                userCartRef.add(item);
            });

            //showing notification  that your cart-items are saved
           
            console.log('Cart data saved to Firestore.');
        }).catch((error) => {
            console.error('Error clearing or updating cart data:', error);
        });
    } else {
        // User is not logged in, handle accordingly
        showNotification('Your are not logged in');
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
    }, 1200);
}



//populate cart when user logged in Code below --------------------------------

    // Check if the user is logged in
    if (isLoggedIn()) {
        if (!isCartDataFetched()) {
            // Get the authenticated user's ID
            var userId = getAuthenticatedUserId();
    
            setCartDataFetchedFlag();
    
            // Access the user's 'Cart' collection in Firestore
            var userCartRef = firebase.firestore().collection('UserDetails').doc(userId).collection('Cart');
    
            // Retrieve cart items from Firestore
            userCartRef.get().then((querySnapshot) => {
                var existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
                var newCartItems = [];
    
                // Iterate through documents and convert to array
                querySnapshot.forEach((doc) => {
                    var cartItem = doc.data();
                    newCartItems.push(cartItem);
                });
    
                // Merge existing items with new items
                var mergedCartItems = mergeCartItems(existingCartItems, newCartItems);
    
                // Update local storage with merged cart data
                localStorage.setItem('cart', JSON.stringify(mergedCartItems));
    
                console.log('Cart data retrieved from Firestore and merged with local storage.');
    
            }).catch((error) => {
                console.error('Error retrieving cart data from Firestore:', error);
            });
        }
    } else {
        console.log("Please login to continue");
    }
    
    // Function to merge cart items
    function mergeCartItems(existingItems, newItems) {
        newItems.forEach((newItem) => {
            var existingItem = existingItems.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity = newItem.quantity;
            } else {
                existingItems.push(newItem);
            }
        });
    
        return existingItems;
    }
    
    

    function isCartDataFetched() 
    {
        // Check if the 'cartDataFetched' flag is set in sessionStorage
        return sessionStorage.getItem('cartDataFetched') === 'true';
    }

    function setCartDataFetchedFlag()
     {
        // Set the 'cartDataFetched' flag to 'true' in sessionStorage
        sessionStorage.setItem('cartDataFetched', 'true');
    }

//Payment gateway code
$('.checkout-btn').on('click', function () {
    var totalAmount = parseFloat($('#cart-total').text().replace('Total: ₹ ', ''));

    
    // Check if the user is logged in
    if (!isLoggedIn()) {
        showNotification('You are not logged in');
        return;
    }

    // Check if the total amount is zero or less
    if (totalAmount <= 0) {
        showNotification('Please add items to the cart');
    } else {
        $('#payment-div').css('display', 'block');

        var bill = $('#cart-total').text();
        var billnumPart = bill.replace('Total: ₹', '').trim();;
    
        $('.amt-payment span').text('₹'+billnumPart);
        // Event listener for payment method selection
        $('#payment-method').on('change', function () {
            var selectedMethod = $(this).val();
            updatePaymentForm(selectedMethod);
        });
    }
});

$('.cross-icon').on('click', function () {

    $('#payment-div').css('display', 'none');

});


// Event listener for submitting payment
$(document).on('click', '#submit-payment', function () {
    var totalAmount = parseFloat($('#cart-total').text().replace('Total: ₹ ', ''));
    var selectedPaymentMethod = $('#payment-method').val();
    var paymentDetails = {};

    // Get payment details based on the selected payment method
    if (selectedPaymentMethod === 'upi') {
        paymentDetails.upiId = $('#upi-id').val();
        if (!paymentDetails.upiId) {
            showNotification('Please enter UPI ID');
            return;
        }
    } else if (selectedPaymentMethod === 'card') {
        paymentDetails.cardNumber = $('#card-number').val();
        paymentDetails.expiryDate = $('#expiry-date').val();
        paymentDetails.ccv = $('#ccv').val();
        if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.ccv) {
            showNotification('Please fill all credit/debit card fields');
            return;
        }
    }
    else{
        showNotification('Please select the payment method');
        return;
    }

    // Perform payment processing logic here

    $('#payment-div').css('display', 'none');
    showNotification('Payment Successful');
});

// Function to update payment form based on the selected payment method
function updatePaymentForm(method) {
    // Hide all payment forms
    $('#upi-form').addClass('hidden');
    $('#card-form').addClass('hidden');

    // Show the selected payment form
    if (method === 'upi') {
        $('#upi-form').removeClass('hidden');
    } else if (method === 'card') {
        $('#card-form').removeClass('hidden');
    }
}

