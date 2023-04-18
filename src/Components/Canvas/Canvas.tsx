import React from 'react'

interface CanvasProps {
  innerRef: any
}

function Canvas({innerRef}: CanvasProps) {
  return <canvas ref={innerRef}></canvas>
}

export default Canvas