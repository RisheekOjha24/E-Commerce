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

// products details in object form

var flowers = {
    "1": {
      name: "Rose",
      description: "A beautiful and fragrant flower.",
      price: "$10.99"
      // Add more properties as needed
    },
    "2": {
      name: "Lily",
      description: "Elegant and symbolic flower.",
      price: "$12.99"
      // Add more properties as needed
    }
    // Add more products as needed
  };

export default flowers;
  
