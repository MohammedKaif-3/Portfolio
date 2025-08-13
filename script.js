// Setting scroll animation for home section
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero-section');
    const navBar = document.getElementById('navbar');

    let a = [];
    for (let i = 1; i <= navBar.firstElementChild.nextElementSibling.nextElementSibling.childElementCount; i++) {
        a.push(document.getElementById(`a${i}`));
        a[i - 1].style.transition = 'all 0s ease';
    }
    const b = document.getElementsByClassName('underline');

    const scrollPosition = window.scrollY;

    const textStartColorHomeSection = { r: 172, g: 170, b: 170 }; // grey
    const textEndColor = { r: 255, g: 255, b: 255 }; // white

    if (scrollPosition > 0) {
        const opacity = Math.max(1 - scrollPosition * 0.002, 0);
        const translateY = Math.min(scrollPosition * 0.5, 200);

        // Update hero section
        heroSection.style.transform = `translateY(${translateY}px)`;
        heroSection.style.opacity = opacity;

        const interpolatedTextColorHomeSection = {
            r: Math.round(textStartColorHomeSection.r + (textEndColor.r - textStartColorHomeSection.r) * (1 - opacity)),
            g: Math.round(textStartColorHomeSection.g + (textEndColor.g - textStartColorHomeSection.g) * (1 - opacity)),
            b: Math.round(textStartColorHomeSection.b + (textEndColor.b - textStartColorHomeSection.b) * (1 - opacity)),
        };
        const textColorHomeSection = `rgb(${interpolatedTextColorHomeSection.r}, ${interpolatedTextColorHomeSection.g}, ${interpolatedTextColorHomeSection.b})`;
        a[0].style.color = textColorHomeSection;

    } else {
        // Reset styles
        heroSection.style.transform = "none";
    }
});

// Setting active nav-link
const navHamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
navHamburger.addEventListener('click', () => {
    sidebar.style.transform = 'translateX(0)';
})

function hideSideBar() {
    sidebar.style.transform = 'translateX(100%)';
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const setActiveLink = () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", setActiveLink);
});

// Skills
const skills = document.querySelectorAll(".newSkill")
for (let i = 0; i < Array.from(skills).length; i++) {
    const skill = skills[i];
    const cover = skill.lastElementChild;
    const text = skill.firstElementChild.firstElementChild.lastElementChild;
    let progresses = [90, 92, 85, 90, 90, 80]
    cover.style.background = `conic-gradient(var(--navbar-color) ${progresses[i] * 3.6}deg, #ededed 100deg)`
    setEventListener(skill, cover, text, progresses[i])
}

function setEventListener(skill, cover, text, val) {
    skill.addEventListener('mouseenter', () => {
        let progressStartValue = 0, progressEndValue = val, speed = 15;
        let progress = setInterval(() => {
            progressStartValue++;
            text.innerHTML = `${progressStartValue}%`
            cover.style.background = `conic-gradient(var(--navbar-color) ${progressStartValue * 3.6}deg, #ededed 100deg)`
            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed)
    })
}


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name || email || message) {
        animateButton(true);
        // sendMail();
    }
});

function sendMail() {
    let params = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    const serviceID = "service_jgpy6tt";
    const templeteID = "template_pq6m8u8"

    emailjs.send(serviceID, templeteID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            animateButton(false);
            showToast("Message Sent");
        }).catch(err => {
            console.log(err)
            animateButton(false);
            showToast("Failed to send message. Please try again.", true);
        })
}


function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.backgroundColor = isError ? "#f44336" : "#2cbb31"; // Red for error, green for success
    toast.className = "show";

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}

function animateButton(isSending) {
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnSpinner = document.getElementById("btn-spinner");

    if (isSending) {
        btnText.style.display = "none"; // Hide text
        btnSpinner.style.display = "inline-block"; // Show spinner
        submitBtn.disabled = true; // Disable button
    } else {
        btnText.style.display = "inline"; // Show text
        btnSpinner.style.display = "none"; // Hide spinner
        submitBtn.disabled = false; // Enable button
    }
}


const slides = document.querySelectorAll('.slide');
const slides2 = document.querySelectorAll('.slide2');
const oSlides = document.querySelectorAll('.oSlide');
let counter = 0, counter2 = 0;
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
})

slides2.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
})

oSlides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
})

const slideImg = (PSlides, count) => {
    PSlides.forEach((slide) => {
        slide.style.transform = `translateX(-${count * 100}%)`
    })
}

setInterval(() => {
    if (counter >= slides.length) {
        counter = 0;
    }
    slideImg(slides, counter)
    counter++;
}, 3000);

setInterval(() => {
    if (counter2 >= slides2.length) {
        counter2 = 0;
    }
    slideImg(slides2, counter2)
    counter2++;
}, 2500);


const logo = document.getElementById("logo");

logo.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = logo.getBoundingClientRect();
    const x = e.clientX - left - width / 2; // Get X position relative to center
    const y = e.clientY - top - height / 2; // Get Y position relative to center

    const rotateX = (y / height) * 50; // Tilt effect on X-axis
    const rotateY = (x / width) * -50; // Tilt effect on Y-axis

    logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotateX(0deg) rotateY(0deg)"; // Reset tilt
});

const pieces = document.querySelectorAll('.puzzle-piece');
const dropzones = document.querySelectorAll('.dropzone');

pieces.forEach(piece => {
    piece.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData('text');
        let piece = document.getElementById(data);

        if (!zone.hasChildNodes()) {
            zone.appendChild(piece);
            zone.classList.add('filled');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    document.body.appendChild(tooltip);

    document.querySelectorAll(".marquee-item").forEach(item => {
        item.addEventListener("mouseenter", function (event) {
            tooltip.innerText = item.getAttribute("data-tooltip");
            tooltip.style.opacity = "1";
        });

        item.addEventListener("mousemove", function (event) {
            tooltip.style.top = event.pageY + 15 + "px";
            tooltip.style.left = event.pageX + 15 + "px";
        });

        item.addEventListener("mouseleave", function () {
            tooltip.style.opacity = "0";
        });
    });
});



