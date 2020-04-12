function drawBorder(ctx, x, y, width, height, thickness = 1, color){
  ctx.fillStyle = color || '#000';
  ctx.fillRect(x - (thickness), y - (thickness), width + (thickness * 2), height + (thickness * 2));
}

export default drawBorder;