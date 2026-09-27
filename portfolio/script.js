/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-expanded", "true");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

}


/* Close mobile menu when link is clicked */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

});


/* Close menu with Escape key */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    }

});


/* =========================================
   SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typing-text");

const words = [
    "Web Developer",
    "BSCIT Student",
    "Frontend Developer",
    "Creative Coder"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );

}

typeEffect();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealOnScroll = () => {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("visible");

        }

    });

};

window.addEventListener(
    "scroll",
    revealOnScroll,
    { passive: true }
);

revealOnScroll();


/* =========================================
   SKILL BAR ANIMATION
========================================= */

const skillsSection =
    document.getElementById("skills");

const progressBars =
    document.querySelectorAll(".progress-bar");

let skillsAnimated = false;


function animateSkills() {

    if (skillsAnimated || !skillsSection) {
        return;
    }

    const sectionPosition =
        skillsSection.getBoundingClientRect().top;

    const screenPosition =
        window.innerHeight - 100;


    if (sectionPosition < screenPosition) {

        progressBars.forEach(bar => {

            const width =
                bar.getAttribute("data-width");

            bar.style.width = width;

        });

        skillsAnimated = true;

    }

}

window.addEventListener(
    "scroll",
    animateSkills,
    { passive: true }
);

animateSkills();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section, header");

const navigationLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        if (!section.id) {
            return;
        }

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================================
   SCROLL PROGRESS BAR
========================================= */

const scrollProgress =
    document.createElement("div");

scrollProgress.id = "scrollProgress";

document.body.prepend(scrollProgress);


function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (documentHeight <= 0) {
        return;
    }

    const progress =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        `${progress}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }, { passive: true });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   PROJECT CARD 3D EFFECT
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


/* Only enable 3D effect on devices with a mouse */

if (window.matchMedia("(hover: hover)").matches) {

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 25;

            const rotateY =
                (centerX - x) / 25;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });

}


/* =========================================
   PROJECT IMAGE MOUSE GLOW
========================================= */

const projectImages =
    document.querySelectorAll(".project-image");


if (window.matchMedia("(hover: hover)").matches) {

    projectImages.forEach(image => {

        image.addEventListener("mousemove", event => {

            const rect =
                image.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            image.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            image.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

    });

}


/* =========================================
   BUTTON HOVER EFFECT
========================================= */

const interactiveButtons =
    document.querySelectorAll(
        ".button, .submit-button, .cv-button"
    );


interactiveButtons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform =
            "translateY(-3px)";

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "";

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            /* Check empty fields */

            if (!name || !email || !message) {

                formMessage.style.color =
                    "#ff6b6b";

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            /* Check email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.style.color =
                    "#ff6b6b";

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;

            }


            /* Success message */

            formMessage.style.color =
                "#7dff9a";

            formMessage.textContent =
                `Thanks ${name}! Your message has been received.`;


            contactForm.reset();


            setTimeout(() => {

                formMessage.textContent = "";

            }, 5000);

        }
    );

}


/* =========================================
   PROJECT BUTTON DEMO
========================================= */

const projectLinks =
    document.querySelectorAll(".project-link");


projectLinks.forEach(link => {

    link.addEventListener("click", event => {

        if (link.getAttribute("href") === "#") {

            event.preventDefault();

            alert(
                "Project link will be added soon!"
            );

        }

    });

});


/* =========================================
   COPY EMAIL TO CLIPBOARD
========================================= */

const emailElements =
    document.querySelectorAll(".contact-item p");


emailElements.forEach(element => {

    if (element.textContent.includes("@")) {

        element.style.cursor = "pointer";
        element.title = "Click to copy email";


        element.addEventListener("click", async () => {

            const email =
                element.textContent.trim();

            try {

                await navigator.clipboard.writeText(email);

                const originalText =
                    element.textContent;

                element.textContent =
                    "Email copied ✓";

                setTimeout(() => {

                    element.textContent =
                        originalText;

                }, 2000);

            } catch (error) {

                console.log(
                    "Could not copy email."
                );

            }

        });

    }

});


/* =========================================
   IMAGE LOADING
========================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.setAttribute(
        "loading",
        "lazy"
    );

});


/* Keep hero image loading immediately */

const heroImage =
    document.querySelector(".image-circle img");


if (heroImage) {

    heroImage.setAttribute(
        "loading",
        "eager"
    );

}


/* =========================================
   PAGE LOAD ANIMATION
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add(
        "page-loaded"
    );

});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   NAVBAR SHADOW ON SCROLL
========================================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 30px rgba(0, 0, 0, 0.3)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }, { passive: true });

}


/* =========================================
   REDUCED MOTION SUPPORT
========================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "Sajan Basnet Portfolio loaded successfully 🚀"
);