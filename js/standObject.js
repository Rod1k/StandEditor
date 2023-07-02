class standObject {
    start_x;
    start_y;
    coordinates = [];
    createdStand = false;

    constructor(x, y, ctx) {
        this.start_x = x;
        this.start_y = y;
        this.coordinates.push([x, y]);
        this.ctx = ctx;
    }

    addCoordinates(x, y) {
        if ((x <= this.start_x + 5) &&
            (this.start_x - 5 <= x) &&
            (y <= this.start_y + 5) &&
            (this.start_y - 5 <= y)) {
            this.createdStand = true;
        }
        this.coordinates.push([x, y]);
    }

    createStartPoint() {
        this.ctx.beginPath();
        this.ctx.arc(this.start_x, this.start_y, 5, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.stroke();
    }

    create() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_x, this.start_y);
        this.coordinates.forEach(coordinate => {
            this.ctx.lineTo(coordinate[0], coordinate[1]);
            this.ctx.stroke();
        });
        this.ctx.stroke();
    }

    created() {
        return this.createdStand;
    }

    lastCoodinates() {
        this.last_x = this.coordinates.slice(-1)[0][0];
        this.last_y = this.coordinates.slice(-1)[0][1];
        return [this.last_x, this.last_y];
    }

    drawLine(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.last_x, this.last_y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_x, this.start_y);
        this.coordinates.forEach(coordinate => {
            this.ctx.lineTo(coordinate[0], coordinate[1]);
            this.ctx.stroke();
        });
        this.ctx.stroke();
    }

}

export { standObject }