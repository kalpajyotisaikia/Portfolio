// ======================
// LENIS SMOOTH SCROLL
// ======================

const lenis = new Lenis({
  duration: 1.8,
  smoothWheel: true,
  smoothTouch: true
})

function raf(time) {

  lenis.raf(time)

  requestAnimationFrame(raf)

}

requestAnimationFrame(raf)

// ======================
// LOADER
// ======================

gsap.to(".loader", {

  opacity: 0,
  delay: 1.8,
  duration: 1.5,

  pointerEvents: "none"

})

// ======================
// CURSOR
// ======================

const cursor =
document.querySelector(".cursor")

window.addEventListener("mousemove", (e) => {

  gsap.to(cursor, {

    x: e.clientX,
    y: e.clientY,

    duration: .12,

    ease: "power3.out"

  })

})

// ======================
// GSAP ANIMATIONS
// ======================

gsap.registerPlugin(ScrollTrigger)

// HERO

gsap.from(".hero-sub", {

  opacity: 0,
  y: 30,

  duration: 1.5,

  ease: "power3.out"

})

gsap.from(".reveal", {

  opacity: 0,
  y: 180,

  duration: 2,

  ease: "power4.out"

})

gsap.from(".hero p", {

  opacity: 0,
  y: 60,

  delay: .3,

  duration: 1.6,

  ease: "power3.out"

})

gsap.from(".hero-btn", {

  opacity: 0,
  y: 40,

  delay: .5,

  duration: 1.6,

  ease: "power3.out"

})

// FLOATING HERO

gsap.to(".hero-content", {

  y: 30,

  duration: 4,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut"

})

// PARALLAX

gsap.to(".gradient", {

  y: 300,

  scrollTrigger: {
    scrub: true
  }

})

// SECTION REVEAL

gsap.utils.toArray(".section").forEach(section => {

  gsap.from(section, {

    opacity: 0,
    y: 120,

    duration: 1.5,

    ease: "power3.out",

    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    }

  })

})

// PROJECT REVEAL

gsap.utils.toArray(".project").forEach(project => {

  gsap.from(project, {

    opacity: 0,
    y: 120,

    duration: 1.5,

    ease: "power3.out",

    scrollTrigger: {
      trigger: project,
      start: "top 85%"
    }

  })

})

// ======================
// MAGNETIC BUTTON
// ======================

const buttons =
document.querySelectorAll(".hero-btn")

buttons.forEach(btn => {

  btn.addEventListener("mousemove", (e) => {

    const rect =
    btn.getBoundingClientRect()

    const x =
    e.clientX - rect.left - rect.width / 2

    const y =
    e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {

      x: x * .2,
      y: y * .2,

      duration: .4,

      ease: "power3.out"

    })

  })

  btn.addEventListener("mouseleave", () => {

    gsap.to(btn, {

      x: 0,
      y: 0,

      duration: .7,

      ease: "elastic.out(1,0.3)"

    })

  })

})

// ======================
// INTERACTIVE STARFIELD
// ======================

const canvas =
document.getElementById("particles")

const ctx =
canvas.getContext("2d")

canvas.width = window.innerWidth

canvas.height = window.innerHeight

let mouse = {

  x: null,
  y: null,

  radius: 160

}

window.addEventListener("mousemove", (e) => {

  mouse.x = e.x
  mouse.y = e.y

})

window.addEventListener("mouseout", () => {

  mouse.x = undefined
  mouse.y = undefined

})

// ======================
// STAR CLASS
// ======================

class Star {

  constructor() {

    this.x =
    Math.random() * canvas.width

    this.y =
    Math.random() * canvas.height

    this.baseX = this.x
    this.baseY = this.y

    this.size =
    Math.random() * 2 + .6

    this.density =
    (Math.random() * 25) + 8

    this.speedX =
    (Math.random() - .5) * .08

    this.speedY =
    (Math.random() - .5) * .08

    this.vx = 0
    this.vy = 0

  }

  draw() {

    ctx.beginPath()

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    )

    ctx.fillStyle =
    "rgba(255,255,255,.95)"

    ctx.shadowBlur = 15
    ctx.shadowColor = "#ffffff"

    ctx.fill()

  }

  update() {

    // Ambient floating

    this.baseX += this.speedX
    this.baseY += this.speedY

    if(this.baseX > canvas.width || this.baseX < 0){

      this.speedX *= -1

    }

    if(this.baseY > canvas.height || this.baseY < 0){

      this.speedY *= -1

    }

    // Mouse interaction

    let dx =
    mouse.x - this.x

    let dy =
    mouse.y - this.y

    let distance =
    Math.sqrt(dx * dx + dy * dy)

    if(distance < mouse.radius){

      const angle =
      Math.atan2(dy, dx)

      const force =
      (mouse.radius - distance)
      / mouse.radius

      const push =
      force * 3.5

      this.vx -=
      Math.cos(angle) * push

      this.vy -=
      Math.sin(angle) * push

    }

    // Smooth return

    this.vx +=
    (this.baseX - this.x) * 0.008

    this.vy +=
    (this.baseY - this.y) * 0.008

    // Friction

    this.vx *= 0.94
    this.vy *= 0.94

    this.x += this.vx
    this.y += this.vy

  }

}

// ======================
// STARS
// ======================

let stars = []

function initStars() {

  stars = []

  for(let i = 0; i < 220; i++) {

    stars.push(new Star())

  }

}

initStars()

// ======================
// CONNECT STARS
// ======================

function connectStars() {

  for(let a = 0; a < stars.length; a++) {

    for(let b = a; b < stars.length; b++) {

      let dx =
      stars[a].x - stars[b].x

      let dy =
      stars[a].y - stars[b].y

      let distance =
      dx * dx + dy * dy

      if(distance < 5500) {

        const opacity =
        1 - (distance / 5500)

        ctx.beginPath()

        ctx.strokeStyle =
        `rgba(255,255,255,${opacity * 0.08})`

        ctx.lineWidth = .6

        ctx.moveTo(
          stars[a].x,
          stars[a].y
        )

        ctx.lineTo(
          stars[b].x,
          stars[b].y
        )

        ctx.stroke()

      }

    }

  }

}

// ======================
// ANIMATION LOOP
// ======================

function animateStars() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  )

  for(let i = 0; i < stars.length; i++) {

    stars[i].update()

    stars[i].draw()

  }

  connectStars()

  requestAnimationFrame(animateStars)

}

animateStars()

// ======================
// RESIZE
// ======================

window.addEventListener("resize", () => {

  canvas.width =
  window.innerWidth

  canvas.height =
  window.innerHeight

  initStars()

})

// ======================
// LIGHTBOX GALLERY
// ======================

const galleryImages =
document.querySelectorAll(".gallery-item img")

const lightbox =
document.getElementById("lightbox")

const lightboxImg =
document.getElementById("lightbox-img")

const lightboxClose =
document.querySelector(".lightbox-close")

galleryImages.forEach(img => {

  img.addEventListener("click", () => {

    lightbox.classList.add("active")

    lightboxImg.src = img.src

    document.body.style.overflow = "hidden"

  })

})

lightboxClose.addEventListener("click", closeLightbox)

lightbox.addEventListener("click", (e) => {

  if(e.target === lightbox){

    closeLightbox()

  }

})

function closeLightbox(){

  lightbox.classList.remove("active")

  document.body.style.overflow = "auto"

}

// ESC KEY CLOSE

window.addEventListener("keydown", (e) => {

  if(e.key === "Escape"){

    closeLightbox()

  }

})

// =========================
// PROFILE IMAGE PREVIEW
// =========================

const previewTrigger =
document.querySelector(".preview-trigger")

const imagePreview =
document.getElementById("imagePreview")

const closePreview =
document.querySelector(".close-preview")

previewTrigger.addEventListener("click",()=>{

  imagePreview.classList.add("active")

})

closePreview.addEventListener("click",()=>{

  imagePreview.classList.remove("active")

})

imagePreview.addEventListener("click",(e)=>{

  if(e.target === imagePreview){

    imagePreview.classList.remove("active")

  }

})