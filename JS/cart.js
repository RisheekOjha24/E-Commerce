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

    $('#cart-total').text('Total: ₹' + total);
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
