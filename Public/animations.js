

// Wait for the DOM to be ready before running the animation
document.addEventListener("DOMContentLoaded", function() {
  // Get the element to animate
  const ipDetailsElement = document.getElementById('ipDetails');

  // Use Anime.js to create a fade-in animation
  anime({
    targets: ipDetailsElement,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeInOutQuad',
    duration: 1000,
    delay: 500 // Optional delay for a smoother effect
  });
});
