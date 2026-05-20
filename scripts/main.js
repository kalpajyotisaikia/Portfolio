// ======================
// LENIS SMOOTH SCROLL
// ======================

const lenis = new Lenis({

  duration: 1.6,

  lerp: 0.065,

  smoothWheel: true,

  smoothTouch: true,

  syncTouch: true,

  wheelMultiplier: 0.85,

  touchMultiplier: 1,

  infinite:false

})

lenis.on("scroll", ScrollTrigger.update)

function raf(time){

  lenis.raf(time)

  ScrollTrigger.update()

  requestAnimationFrame(raf)

}

requestAnimationFrame(raf)

// ======================
// LOADER
// ======================

gsap.to(".loader",{

  opacity:0,

  delay:1.8,

  duration:1.5,

  pointerEvents:"none"

})

// ======================
// CURSOR
// ======================

const cursor =
document.querySelector(".cursor")

if(cursor){

  window.addEventListener("mousemove",(e)=>{

    gsap.to(cursor,{

      x:e.clientX,
      y:e.clientY,

      duration:.12,

      ease:"power3.out"

    })

  },{
    passive:true
  })

}

// ======================
// GSAP
// ======================

gsap.registerPlugin(ScrollTrigger)

// HERO

gsap.from(".hero-sub",{

  opacity:0,
  y:20,

  duration:1.2,

  ease:"power3.out"

})

gsap.from(".reveal",{

  opacity:0,
  y:80,

  duration:1.6,

  ease:"power4.out"

})

gsap.from(".hero p",{

  opacity:0,
  y:40,

  delay:.2,

  duration:1.2,

  ease:"power3.out"

})

gsap.from(".hero-btn",{

  opacity:0,
  y:30,

  delay:.4,

  duration:1.2,

  ease:"power3.out"

})

// FLOATING HERO

gsap.to(".hero-content",{

  y:20,

  duration:4,

  repeat:-1,

  yoyo:true,

  ease:"sine.inOut"

})

// PARALLAX

gsap.to(".gradient",{

  y:220,

  scrollTrigger:{
    scrub:true
  }

})

// SECTION REVEAL

gsap.utils.toArray(".section").forEach(section=>{

  gsap.from(section,{

    opacity:0,
    y:60,

    duration:1.2,

    ease:"power3.out",

    scrollTrigger:{
      trigger:section,
      start:"top 85%"
    }

  })

})

// PROJECT REVEAL

gsap.utils.toArray(".project").forEach(project=>{

  gsap.from(project,{

    opacity:0,
    y:60,

    duration:1.2,

    ease:"power3.out",

    scrollTrigger:{
      trigger:project,
      start:"top 88%"
    }

  })

})

// ======================
// MAGNETIC BUTTON
// ======================

const buttons =
document.querySelectorAll(".hero-btn")

buttons.forEach(btn=>{

  btn.addEventListener("mousemove",(e)=>{

    const rect =
    btn.getBoundingClientRect()

    const x =
    e.clientX - rect.left - rect.width / 2

    const y =
    e.clientY - rect.top - rect.height / 2

    gsap.to(btn,{

      x:x * .18,
      y:y * .18,

      duration:.35,

      ease:"power3.out"

    })

  })

  btn.addEventListener("mouseleave",()=>{

    gsap.to(btn,{

      x:0,
      y:0,

      duration:.7,

      ease:"elastic.out(1,0.3)"

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

const dpr =
Math.min(window.devicePixelRatio,1.5)

canvas.width =
window.innerWidth * dpr

canvas.height =
window.innerHeight * dpr

canvas.style.width =
window.innerWidth + "px"

canvas.style.height =
window.innerHeight + "px"

ctx.scale(dpr,dpr)

let mouse = {

  x:null,
  y:null,

  radius:160

}

// MOUSE

window.addEventListener("mousemove",(e)=>{

  mouse.x = e.clientX
  mouse.y = e.clientY

},{
  passive:true
})

// TOUCH

window.addEventListener("touchmove",(e)=>{

  mouse.x =
  e.touches[0].clientX

  mouse.y =
  e.touches[0].clientY

},{
  passive:true
})

// OUT

window.addEventListener("mouseout",()=>{

  mouse.x = undefined
  mouse.y = undefined

})

// ======================
// STAR CLASS
// ======================

class Star{

  constructor(){

    this.x =
    Math.random() * window.innerWidth

    this.y =
    Math.random() * window.innerHeight

    this.baseX = this.x
    this.baseY = this.y

    this.size =
    Math.random() * 2 + .6

    this.speedX =
    (Math.random() - .5) * .08

    this.speedY =
    (Math.random() - .5) * .08

    this.vx = 0
    this.vy = 0

  }

  draw(){

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

    ctx.shadowBlur = 8

    ctx.shadowColor =
    "#ffffff"

    ctx.fill()

  }

  update(){

    this.baseX += this.speedX
    this.baseY += this.speedY

    if(
      this.baseX > window.innerWidth ||
      this.baseX < 0
    ){

      this.speedX *= -1

    }

    if(
      this.baseY > window.innerHeight ||
      this.baseY < 0
    ){

      this.speedY *= -1

    }

    let dx =
    mouse.x - this.x

    let dy =
    mouse.y - this.y

    let distance =
    (dx * dx + dy * dy)

    if(distance < mouse.radius * mouse.radius){

      const angle =
      Math.atan2(dy,dx)

      const force =
      1 - (
        distance /
        (mouse.radius * mouse.radius)
      )

      const push =
      force * 3.2

      this.vx -=
      Math.cos(angle) * push

      this.vy -=
      Math.sin(angle) * push

    }

    this.vx +=
    (this.baseX - this.x) * 0.008

    this.vy +=
    (this.baseY - this.y) * 0.008

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

function initStars(){

  stars = []

  const starCount =
  window.innerWidth < 768 ? 120 : 180

  for(let i = 0; i < starCount; i++){

    stars.push(new Star())

  }

}

initStars()

// ======================
// CONNECT STARS
// ======================

function connectStars(){

  for(let a = 0; a < stars.length; a++){

    for(let b = a; b < stars.length; b++){

      let dx =
      stars[a].x - stars[b].x

      let dy =
      stars[a].y - stars[b].y

      let distance =
      dx * dx + dy * dy

      if(distance < 3200){

        const opacity =
        1 - (distance / 3200)

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

let lastTime = 0

const fps = 60

const interval = 1000 / fps

function animateStars(timestamp){

  requestAnimationFrame(animateStars)

  const delta =
  timestamp - lastTime

  if(delta < interval) return

  lastTime =
  timestamp - (delta % interval)

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  )

  for(let i = 0; i < stars.length; i++){

    stars[i].update()

    stars[i].draw()

  }

  connectStars()

}

requestAnimationFrame(animateStars)

// ======================
// RESIZE
// ======================

window.addEventListener("resize",()=>{

  const dpr =
  Math.min(window.devicePixelRatio,1.5)

  canvas.width =
  window.innerWidth * dpr

  canvas.height =
  window.innerHeight * dpr

  canvas.style.width =
  window.innerWidth + "px"

  canvas.style.height =
  window.innerHeight + "px"

  ctx.scale(dpr,dpr)

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

galleryImages.forEach(img=>{

  img.addEventListener("click",()=>{

    lightbox.classList.add("active")

    lightboxImg.src = img.src

    document.body.style.overflow = "hidden"

  })

})

function closeLightbox(){

  lightbox.classList.remove("active")

  document.body.style.overflow = "auto"

}

if(lightboxClose){

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  )

}

if(lightbox){

  lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

      closeLightbox()

    }

  })

}

window.addEventListener("keydown",(e)=>{

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

if(previewTrigger && imagePreview){

  previewTrigger.addEventListener("click",()=>{

    imagePreview.classList.add("active")

  })

}

if(closePreview && imagePreview){

  closePreview.addEventListener("click",()=>{

    imagePreview.classList.remove("active")

  })

}

if(imagePreview){

  imagePreview.addEventListener("click",(e)=>{

    if(e.target === imagePreview){

      imagePreview.classList.remove("active")

    }

  })

}

// ======================
// MOBILE MENU
// ======================

const menuToggle =
document.getElementById("menuToggle")

const navbar =
document.getElementById("navbar")

if(menuToggle && navbar){

  menuToggle.addEventListener("click",()=>{

    menuToggle.classList.toggle("active")

    navbar.classList.toggle("active")

  })

  document
  .querySelectorAll("nav a")
  .forEach(link=>{

    link.addEventListener("click",()=>{

      menuToggle.classList.remove("active")

      navbar.classList.remove("active")

    })

  })

}