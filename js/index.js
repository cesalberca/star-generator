(function () {
  let c = document.querySelector('#canvas')
  let ctx = c.getContext('2d')
  let w = window.innerWidth
  let h = window.innerHeight
  
  let polygon = {
    x: 0,
    y: 0,
    radius: 0,
    apex: 0,
    skips: 0,
    insideLines: false
  }
  
  let polygons = []
  
  function drawPolygon (x, y, radius, apex, skips, insideLines) {
    if (apex < 3) {
      return
    }
    
    let xPos
    let yPos
    let inlineX
    let inlineY
    
    ctx.save()
    ctx.moveTo(x, y)
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    
    for (let i = 0; i <= apex; i++) {
      xPos = x + radius * Math.cos(i * 2 * Math.PI / apex)
      yPos = y + radius * Math.sin(i * 2 * Math.PI / apex)
      
      if (insideLines) {
        inlineX = x + radius * Math.cos((i + skips) * 2 * Math.PI / apex)
        inlineY = y + radius * Math.sin((i + skips) * 2 * Math.PI / apex)
        ctx.lineTo(inlineX, inlineY)
      }
      
      ctx.lineTo(xPos, yPos)
      ctx.stroke()
    }
    
    ctx.closePath()
    ctx.restore()
  }
  
  function draw () {
    let time = new Date()
    let angle =  ((2 * Math.PI) / 60) * time.getSeconds() + (( 2 * Math.PI) / 60000) * time.getMilliseconds() 
    
    ctx.save()
    ctx.clearRect(0, 0, w, h)
    ctx.globalAlpha = 0.2
    ctx.translate(w / 2, h / 2)
    
    for (let i = 0; i < polygons.length; i++) {
      ctx.rotate(i % 2 === 0 ? angle * i : -angle * i)
      drawPolygon(polygons[i].x, polygons[i].y, polygons[i].radius, polygons[i].apex, polygons[i].skips, polygons[i].insideLines)
    }
    ctx.restore()
    window.requestAnimationFrame(draw)
  }
  
  function getRandomMinMax (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  
  function generatePolygon () {
    let polygon = {}
    polygon.x = 0
    polygon.y = 0
    polygon.radius = getRandomMinMax(100, 300)
    polygon.apex = getRandomMinMax(5, 20)
    polygon.skips = getRandomMinMax(3, 5)
    polygon.insideLines = true
    return polygon
  }
  
  function init () {
    c.width = w
    c.height = h
    
    for (let i = 0; i < 5; i++) {
      polygons.push(generatePolygon())  
    }
    
    window.requestAnimationFrame(draw)
  }
  
  init()
})()