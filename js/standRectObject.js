class standRectObject {
    start_x;
    start_y;
    width;
    height;
    createdStand = false;
    stepGrid = 0;
    gridLine;

    constructor(start_x, width, height, ctx) {
        this.start_x = Number(start_x);
        this.start_y = Number(start_x);
        this.width = Number(width);
        this.height = Number(height);
        this.ctx = ctx;
        this.createdStand = true;
    }

    get stepGrid() {
        return stepGrid;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(this.start_x, this.start_y, this.width, this.height);
        this.ctx.strokeRect(this.start_x, this.start_y, this.width, this.height);
        this.ctx.closePath();
        this.grid();
    }

    // Сетка разметки
    grid() {
        if (this.stepGrid == 0) {
            this.stepGrid = 50;
        }
        this.gridLine = this.start_x + this.stepGrid;
        this.ctx.strokeStyle = "#ececec";
        this.ctx.lineWidth = "1"; //толщина линии
        while (this.gridLine <= (this.start_x + this.width)) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.gridLine, this.start_y);
            this.ctx.lineTo(this.gridLine, this.start_y + this.height);
            this.ctx.moveTo(this.start_x, this.gridLine);
            this.ctx.lineTo(this.start_x + this.width, this.gridLine);
            this.gridLine += this.stepGrid;
            this.ctx.stroke(); // обводка линии
        }
    }

    mouseInStand(x, y) {
        if ((this.start_x <= x) &&
            (x <= this.start_x + this.width) &&
            (this.start_y <= y) &&
            (y <= this.start_y + this.height)) {
            return true;
        } else {
            return false;
        }
    }

    created() {
        return this.createdStand;
    }
}
export { standRectObject }