import React from "react";

interface TankProps {
    ctx: CanvasRenderingContext2D
    size: [number, number]
    position: [number, number]
}

const Tank: React.FC<TankProps> = (props) => {
    props.ctx.fillStyle = 'green'
    props.ctx.fillRect(props.position[0], props.position[1], props.size[0], props.size[1])

    return null
}

export default Tank