class standObject {
    start_x;
    start_y;
    last_x;
    last_y;
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
        } else {
            this.coordinates.push([x, y]);
        }

    }

    createStartPoint() {
        this.ctx.beginPath();
        this.ctx.arc(this.start_x, this.start_y, 3.2, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.stroke();
    }

    create() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_x, this.start_y);
        this.coordinates.forEach(coordinate => {
            this.ctx.lineTo(coordinate[0], coordinate[1]);
            this.ctx.strokeStyle = '#000';
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
        this.checkForStartpoint(x, y)
        this.ctx.beginPath();
        this.ctx.moveTo(this.last_x, this.last_y);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        this.drawSizeLine(x, y);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_x, this.start_y);
        this.coordinates.forEach(coordinate => {
            this.ctx.lineTo(coordinate[0], coordinate[1]);
        });
        this.ctx.lineTo(this.start_x, this.start_y);
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawGrid() {
    }

    drawSizeLine(x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'green';
        this.sizeLine = Math.sqrt((Math.pow((x - this.last_x),2) + Math.pow((y - this.last_y),2))).toFixed(1)
        if (Math.abs(x - this.last_x) > Math.abs(y - this.last_y)) {
            this.ctx.moveTo(this.lastCoodinates()[0], this.lastCoodinates()[1]);
            this.ctx.lineTo(this.lastCoodinates()[0], this.lastCoodinates()[1] - 15);
            this.ctx.moveTo(this.lastCoodinates()[0], this.lastCoodinates()[1] - 10);
            this.ctx.lineTo(x, y - 10);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - 15);
            this.ctx.font = "22px system-ui, sans-serif";
            this.ctx.fillText(this.sizeLine, (this.last_x + x) / 2 - 20, ((this.last_y + y) / 2) - 20);
        }
        if (Math.abs(x - this.last_x) < Math.abs(y - this.last_y)) {
            this.ctx.moveTo(this.lastCoodinates()[0], this.lastCoodinates()[1]);
            this.ctx.lineTo(this.lastCoodinates()[0] - 15, this.lastCoodinates()[1]);
            this.ctx.moveTo(this.lastCoodinates()[0] - 10, this.lastCoodinates()[1]);
            this.ctx.lineTo(x - 10, y);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - 15, y);
        }
        this.ctx.stroke();

    }

    checkForStartpoint(x, y) {
        if ((this.start_x == x) || (this.start_y == y)) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.start_x, this.start_y);
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = 'green';
            this.ctx.stroke();
        }

    }

}

export { standObject }