/* =========================================================
   AYESHA REEMAN — portfolio interactions (vanilla JS)
   1. Sticky top bar
   2. Full-screen menu
   3. Scroll reveal
   4. Cover figure: mouse parallax + gentle float
   5. Scroll parallax on decorative / callback figures
   6. Magnetic CTA button
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Sticky top bar ---------- */
  var topbar = document.querySelector(".topbar");

  function onScroll() {
    topbar.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll);

  /* ---------- 2. Full-screen menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var overlay = document.querySelector(".overlay-nav");
  var close = document.querySelector(".overlay-close");

  function openMenu() {
    overlay.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", function () {
    if (overlay.classList.contains("is-open")) closeMenu();
    else openMenu();
  });
  close.addEventListener("click", closeMenu);

  overlay.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------- 3. Scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- 4. Cover figure: parallax + float ---------- */
  var figure = document.getElementById("cover-figure");
  var pointerX = 0;
  var pointerY = 0;

  if (figure && !reduceMotion) {
    window.addEventListener("mousemove", function (event) {
      // normalise the cursor into a -1 .. 1 range
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    var start = Date.now();

    function render() {
      var seconds = (Date.now() - start) / 1000;
      var floatY = Math.sin(seconds * 0.55) * 9;
      var moveX = pointerX * 16;
      var moveY = pointerY * 10 + floatY;

      // keep the -50% centring from the CSS, add motion on top
      figure.style.transform =
        "translateX(-50%) translate3d(" + moveX.toFixed(2) + "px," + moveY.toFixed(2) + "px,0)";

      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  }

  /* ---------- 5. Scroll parallax on the giant cover word ---------- */
  var word = document.querySelector(".cover-word");

  if (word && !reduceMotion) {
    window.addEventListener(
      "scroll",
      function () {
        var offset = Math.min(window.scrollY, 700) * 0.18;
        word.style.transform = "translateX(-50%) translateY(" + offset.toFixed(1) + "px)";
      },
      { passive: true }
    );
  }

  /* ---------- 6. Magnetic CTA ---------- */
  document.querySelectorAll(".magnetic").forEach(function (button) {
    if (reduceMotion) return;

    button.addEventListener("mousemove", function (event) {
      var box = button.getBoundingClientRect();
      var x = event.clientX - box.left - box.width / 2;
      var y = event.clientY - box.top - box.height / 2;
      button.style.transform = "translate(" + x * 0.16 + "px," + y * 0.22 + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "";
    });
  });
});
