class rulerObject {
    start_x;
    start_y;
    last_x;
    last_y;

    constructor(x, y, ctx) {
        this.start_x = x;
        this.start_y = y;
        this.ctx = ctx;
    }

    create(x, y) {
        this.last_x = x;
        this.last_y = y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_x, this.start_y);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineTo(this.last_x, this.last_y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'green';
        this.sizeLine = Math.sqrt((Math.pow((x - this.start_x), 2) + Math.pow((y - this.start_y), 2))).toFixed(1)
        this.ctx.moveTo(this.start_x, this.start_y);
        this.ctx.lineTo(this.start_x, this.start_y - 15);
        this.ctx.moveTo(this.start_x, this.start_y - 10);
        this.ctx.lineTo(this.last_x, this.last_y - 10)
        this.ctx.moveTo(this.last_x, this.last_y);
        this.ctx.lineTo(this.last_x, this.last_y - 15);
        this.ctx.font = "22px system-ui, sans-serif";
        this.ctx.fillText(this.sizeLine, (this.start_x + this.last_x) / 2 - 20, ((this.start_y + this.last_y) / 2) - 20);
        this.ctx.stroke();
    }
}

export { rulerObject }