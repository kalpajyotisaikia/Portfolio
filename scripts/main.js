// ======================
// DEVICE CHECK
// ======================

const isMobile =
window.innerWidth < 768

// ======================
// LENIS SMOOTH SCROLL
// ======================

const lenis = new Lenis({

  duration: 1.2,

  lerp: 0.09,

  smoothWheel: true,

  smoothTouch: true,

  syncTouch: true,

  wheelMultiplier: 0.9,

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

  delay:1.2,

  duration:1.2,

  pointerEvents:"none"

})

// ======================
// CURSOR
// ======================

const cursor =
document.querySelector(".cursor")

if(cursor && !isMobile){

  window.addEventListener("mousemove",(e)=>{

    gsap.to(cursor,{

      x:e.clientX,
      y:e.clientY,

      duration:.1,

      ease:"power2.out"

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

  duration:1,

  ease:"power3.out"

})

gsap.from(".reveal",{

  opacity:0,
  y:80,

  duration:1.4,

  ease:"power4.out"

})

gsap.from(".hero p",{

  opacity:0,
  y:40,

  delay:.2,

  duration:1,

  ease:"power3.out"

})

gsap.from(".hero-btn",{

  opacity:0,
  y:30,

  delay:.35,

  duration:1,

  ease:"power3.out"

})

// FLOATING HERO

if(!isMobile){

  gsap.to(".hero-content",{

    y:16,

    duration:4,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

  })

}

// PARALLAX

gsap.to(".gradient",{

  y:isMobile ? 120 : 220,

  scrollTrigger:{
    scrub:1
  }

})

// SECTION REVEAL

gsap.utils.toArray(".section").forEach(section=>{

  gsap.from(section,{

    opacity:0,
    y:50,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{
      trigger:section,
      start:"top 88%"
    }

  })

})

// PROJECT REVEAL

gsap.utils.toArray(".project").forEach(project=>{

  gsap.from(project,{

    opacity:0,
    y:50,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{
      trigger:project,
      start:"top 90%"
    }

  })

})

// ======================
// MAGNETIC BUTTON
// ======================

if(!isMobile){

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

        x:x * .15,
        y:y * .15,

        duration:.3,

        ease:"power2.out"

      })

    })

    btn.addEventListener("mouseleave",()=>{

      gsap.to(btn,{

        x:0,
        y:0,

        duration:.5,

        ease:"power3.out"

      })

    })

  })

}

// ======================
// INTERACTIVE STARFIELD
// ======================

const canvas =
document.getElementById("particles")

const ctx =
canvas.getContext("2d")

const dpr =
Math.min(window.devicePixelRatio,1.2)

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

  radius:isMobile ? 90 : 160

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

window.addEventListener("touchend",()=>{

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
    Math.random() * 1.6 + .4

    this.speedX =
    (Math.random() - .5) * .04

    this.speedY =
    (Math.random() - .5) * .04

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
    "rgba(255,255,255,.9)"

    ctx.shadowBlur =
    isMobile ? 0 : 8

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
    dx * dx + dy * dy

    if(
      mouse.x &&
      distance < mouse.radius * mouse.radius
    ){

      const angle =
      Math.atan2(dy,dx)

      const force =
      1 - (
        distance /
        (mouse.radius * mouse.radius)
      )

      const push =
      force * 2

      this.vx -=
      Math.cos(angle) * push

      this.vy -=
      Math.sin(angle) * push

    }

    this.vx +=
    (this.baseX - this.x) * 0.005

    this.vy +=
    (this.baseY - this.y) * 0.005

    this.vx *= 0.92
    this.vy *= 0.92

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
  isMobile ? 70 : 140

  for(let i = 0; i < starCount; i++){

    stars.push(new Star())

  }

}

initStars()

// ======================
// CONNECT STARS
// ======================

function connectStars(){

  if(isMobile) return

  for(let a = 0; a < stars.length; a++){

    for(let b = a; b < stars.length; b++){

      let dx =
      stars[a].x - stars[b].x

      let dy =
      stars[a].y - stars[b].y

      let distance =
      dx * dx + dy * dy

      if(distance < 2400){

        const opacity =
        1 - (distance / 2400)

        ctx.beginPath()

        ctx.strokeStyle =
        `rgba(255,255,255,${opacity * 0.05})`

        ctx.lineWidth = .5

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

const fps =
isMobile ? 32 : 60

const interval =
1000 / fps

let lastTime = 0

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
// LIGHTBOX
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

// ======================
// PROFILE PREVIEW
// ======================

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