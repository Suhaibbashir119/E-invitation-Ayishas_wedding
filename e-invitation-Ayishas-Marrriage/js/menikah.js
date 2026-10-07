// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "block";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});

// Auto-play video on scroll without play bar & sound controls
$(document).ready(function() {
  var video = document.getElementById("wedding-video");
  var soundBtn = document.getElementById("video-sound-toggle");
  var soundIcon = document.getElementById("sound-icon");
  var soundText = document.getElementById("sound-text");

  if (!video) return;

  // Crucial: explicitly ensure video is muted and set to inline for mobile & desktop autoplay policies
  video.muted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  function playVideo() {
    video.muted = true;
    var promise = video.play();
    if (promise !== undefined) {
      promise.catch(function(err) {
        // Fallback retry
        video.muted = true;
        video.play();
      });
    }
  }

  function pauseVideo() {
    if (!video.paused) {
      video.pause();
    }
  }

  function checkVisibility() {
    var rect = video.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Plays when video enters the viewport
    var isVisible = (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1);
    if (isVisible) {
      if (video.paused) {
        playVideo();
      }
    } else {
      if (!video.paused) {
        pauseVideo();
      }
    }
  }

  // Listen to window scroll, touchmove, and resize
  window.addEventListener("scroll", checkVisibility, { passive: true });
  window.addEventListener("resize", checkVisibility);
  window.addEventListener("touchmove", checkVisibility, { passive: true });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      });
    }, { threshold: [0, 0.1, 0.25] });

    observer.observe(video);
  }

  // Toggle sound
  if (soundBtn) {
    soundBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (video.muted) {
        video.muted = false;
        if (soundIcon) soundIcon.className = "fas fa-volume-up";
        if (soundText) soundText.textContent = "Mute";
      } else {
        video.muted = true;
        if (soundIcon) soundIcon.className = "fas fa-volume-mute";
        if (soundText) soundText.textContent = "Unmute";
      }
    });
  }

  // Clicking video toggles play / pause
  video.addEventListener("click", function() {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  // Initial check in case user is already scrolled to video
  checkVisibility();
});
