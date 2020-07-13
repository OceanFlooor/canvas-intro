let canvas = document.getElementById("canvas")

if (canvas.getContext) {
  let supportTouch = "ontouchstart" in document.documentElement
  let ctx = canvas.getContext("2d")

  resetCanvasSize()
  window.onresize = () => {
    resetCanvasSize()
  }

  let lastPoint

  if (!supportTouch) {
    // pc 端
    let paint = false
    canvas.onmousedown = (e) => {
      paint = true
      setlastPoint(e.clientX, e.clientY)
    }

    canvas.onmousemove = (e) => {
      if (paint) {
        drawLine(e.clientX, e.clientY)
        setlastPoint(e.clientX, e.clientY)
      }
    }

    canvas.onmouseup = (e) => {
      paint = false
    }
  } else {
    canvas.ontouchstart = (e) => {
      e = e.touches[0]
      setlastPoint(e.clientX, e.clientY)
    }

    canvas.ontouchmove = (e) => {
      e = e.touches[0]
      drawLine(e.clientX, e.clientY)
      setlastPoint(e.clientX, e.clientY)
    }
  }

  function drawLine(x, y) {
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function setlastPoint(x, y) {
    lastPoint = { x, y }
  }

  function resetCanvasSize() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 8
    ctx.lineCap = "round"
  }
}
