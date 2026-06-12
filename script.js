gsap.registerPlugin(ScrollTrigger);

// 1. DYNAMIC CUSTOM MOUSE POINTER LOGIC
const cursorDot = document.querySelector(".custom-cursor-dot");
const cursorOutline = document.querySelector(".custom-cursor-outline");

if (window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    gsap.to(cursorDot, { x: posX, y: posY, duration: 0 });
    gsap.to(cursorOutline, { x: posX, y: posY, duration: 0.15, ease: "power2.out" });
  });

  const interactiveTargets = document.querySelectorAll(".nav-item, .glass-card, header, .nav-brand");
  interactiveTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => cursorOutline.classList.add("hover-active"));
    target.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover-active"));
  });
}

// 2. MOBILE TRAY INTERACTION EVENTS
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("is-active");
  navLinks.classList.toggle("is-open");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    menuToggle.classList.remove("is-active");
    navLinks.classList.remove("is-open");
  });
});


// 3. Global Reading Progress Bar
gsap.to(".progress-bar", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});


// 4. Hero Layout Entry Sequence
const heroTimeline = gsap.timeline();
heroTimeline.from(".hero-sub", {
  opacity: 0,
  y: -25,
  duration: 1.2,
  ease: "power2.out"
})
.from(".hero h1", {
  opacity: 0,
  y: 45,
  duration: 1.4,
  ease: "power3.out"
}, "-=0.8");


// 5. Staggered Text Panel Animations
gsap.utils.toArray(".panel:not(.hero)").forEach((panel) => {
  const narrativeElements = panel.querySelectorAll(".glass-card, h2, p, h1, .credit-badge-container");

  gsap.from(narrativeElements, {
    opacity: 0,
    y: 50,
    stagger: 0.22,
    duration: 1.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      start: "top 72%", 
      end: "top 20%",
      toggleActions: "play none none reverse" 
    }
  });
});