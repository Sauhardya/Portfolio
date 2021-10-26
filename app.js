let controller;
let slideScene;
let pageScene;
let detailScene;
h =
  document.documentElement.clientWidth ||
  document.body.clientWidth ||
  window.innerWidth;
function animateSlides() {
  //init controller
  controller = new ScrollMagic.Controller();
  //Selections
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  const svgBottomLines = document.getElementById("bottomComputerLine");
  const topComputerLine1 = document.getElementById("topComputerLine1");
  const topComputerLine2 = document.getElementById("topComputerLine2");
  const rightComputerLine1 = document.getElementById("rightComputerLine1");
  const rightComputerLine2 = document.getElementById("rightComputerLine2");
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //gsap animations
    const SvgMechanics = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 1.5,
      },
    });
    const slideMechancis = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideMechancis.fromTo(revealImg, { x: "0%" }, { x: "100%" });

    slideMechancis.fromTo(img, { scale: 1.2 }, { scale: 1 }, "-=0.5");
    slideMechancis.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");
    slideMechancis.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.6 ");
    SvgMechanics.fromTo(
      svgBottomLines,
      { opacity: "0%" },
      { opacity: "100%" },
      "-=0.5 "
    );
    SvgMechanics.fromTo(
      topComputerLine2,
      { opacity: "0%" },
      { opacity: "100%" },
      (repeat = -1),
      "-=0.6 "
    );
    SvgMechanics.fromTo(
      topComputerLine1,
      { opacity: "0%" },
      { opacity: "100%" },
      "-=0.6 "
    );
    SvgMechanics.fromTo(
      rightComputerLine1,
      { opacity: "0%" },
      { opacity: "100%" },
      "-=0.80"
    );
    SvgMechanics.fromTo(
      rightComputerLine2,
      { opacity: "0%" },
      { opacity: "100%" },
      "-=0.80 "
    );

    //creating scenes for scroll animations
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideMechancis)
      /*.addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })*/
      .addTo(controller);

    //new animation(peeche ki side fading effect)
    const pageMechanics = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageMechanics.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageMechanics.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0 }
    );
    pageMechanics.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.6");
    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      /* .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "Pageslide",
        indent: 200,
      })*/

      .setPin(slide, { pushFollowers: false })
      .setTween(pageMechanics)
      .addTo(controller);
  });
}
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
if (h > 450) {
  function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
  }
}
if (h > 450) {
  function activeCursor(e) {
    const item = e.target;
    console.log(item);
    if (item.id === "logo" || item.classList.contains("burger")) {
      mouse.classList.add("nav-active");
    } else if (item.classList.contains("explore")) {
      mouse.classList.add("explore-active");
      gsap.to(".title-swipe", 0.5, { y: "0%" });
      mouseTxt.innerHTML = "Tap";
    } else {
      mouse.classList.remove("nav-active");
      mouse.classList.remove("explore-active");
      mouseTxt.innerHTML = "";
      gsap.to(".title-swipe", 0.5, { y: "100%" });
    }
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//page transitions - barba
//invoking barba
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        //typeWriterAnimation
        typeWriterAnimation();
        //particle animation
        particlesJS(
          "particle-animation",

          {
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "polygon",
                stroke: {
                  width: 2,
                  color: "#000000",
                },
                polygon: {
                  nb_sides: 4,
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: true,
                  speed: 2,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
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
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
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
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
            config_demo: {
              hide_card: false,
              background_color: "#b61924",
              background_image: "",
              background_position: "50% 50%",
              background_repeat: "no-repeat",
              background_size: "cover",
            },
          }
        );
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },

          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});
//Animating projects page contents--

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  const bmiImg = document.getElementById("bmiImg");

  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    console.log(nextSlide);
    const nextImg = nextSlide.querySelector("#img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "30%" }, { x: "0%" });

    //slideTl.fromTo(bmiImg, { x: "50%" }, { x: "0%" });

    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}
//about-text-animations
function typeWriterAnimation() {
  let x = document.querySelector(".about-animation");
  var typewriter = new Typewriter(x, {
    loop: true,
  });
  typewriter
    .typeString("Flutter Devloper!")
    .pauseFor(800)
    .deleteAll()
    .pauseFor(800)
    .deleteAll()
    .typeString("Machine Learning Enthusiast!")
    .pauseFor(800)
    .deleteAll()
    .typeString("Full Stack Web Dev!")
    .pauseFor(800)
    .deleteAll()
    .start();
}

//event listeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
