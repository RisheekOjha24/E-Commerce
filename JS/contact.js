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

function validateForm(event){
event.preventDefault();
    showNotification("Message Sent succefuly");
    setTimeout(function () {
        window.location.href = "../HTML/contact.html";
},1400)
};

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