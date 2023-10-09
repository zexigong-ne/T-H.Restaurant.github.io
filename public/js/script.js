document.addEventListener("DOMContentLoaded", function () {
  var landingContainer = document.getElementById("landing-container");
  var landingImage = document.getElementById("landing-image");

  // Add a click event listener to the landing image
  landingImage.addEventListener("click", function () {
    // Redirect to the home page
    window.location.href = "home.html";
  });

  // Display the landing image after a delay (e.g., 2 seconds)
  setTimeout(function () {
    landingContainer.style.opacity = 1;
  });
});
