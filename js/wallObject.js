class wallObject {
    x1;
    y1;
    x2;
    y2;
    constructor(x, y) {
        this.x1 = x;
        this.y1 = y;
    }

    draw(x, y, ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(100, 100);
        ctx.stroke();
    }

    


}

export { wallObject }