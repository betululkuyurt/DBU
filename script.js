// Navigation
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobileMenuButton")
  const mobileMenu = document.getElementById("mobileMenu")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 50) {
      navbar.classList.add("bg-white", "dark:bg-gray-900", "shadow-lg")
    } else {
      navbar.classList.remove("bg-white", "dark:bg-gray-900", "shadow-lg")
    }

    lastScroll = currentScroll
  })

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
        // Close mobile menu if open
        mobileMenu.classList.add("hidden")
      }
    })
  })

  // Intersection Observer for Fade In Animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element)
  })

  // Initialize Particles.js
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: false,
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
      },
      retina_detect: true,
    })
  }

  // Tabs Functionality
  const tabButtons = document.querySelectorAll('[role="tab"]')
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active classes
      tabButtons.forEach((btn) => {
        btn.classList.remove("text-blue-600", "border-blue-600")
        btn.classList.add("text-gray-500", "border-transparent")
      })

      // Add active classes to clicked button
      button.classList.add("text-blue-600", "border-blue-600")
      button.classList.remove("text-gray-500", "border-transparent")

      // Show corresponding panel
      const targetId = button.getAttribute("data-tab")
      tabPanels.forEach((panel) => {
        panel.classList.remove("active")
      })
      document.getElementById(`${targetId}-panel`).classList.add("active")
    })
  })

  // Form Submissions
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const submitButton = form.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      // Show loading state
      submitButton.disabled = true
      submitButton.innerHTML = `
                <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            `

      // Simulate form submission
      setTimeout(() => {
        submitButton.disabled = false
        submitButton.innerHTML = originalText
        form.reset()
        alert("Form submitted successfully!")
      }, 2000)
    })
  })
})

// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark")
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
}

// Check for saved user preference, respect OS preference
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}
