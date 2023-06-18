class standObject {
    start_x;
    start_y;
    coordinates = [];

    constructor(x, y) {
        this.start_x = x;
        this.start_y = y;
        this.coordinates.push([x, y]);
    }

    addCoordinates(x, y) {
        this.coordinates.push([x, y]);
    }

    createStartPoint(ctx) {
        ctx.beginPath();
        ctx.arc(this.start_x, this.start_y ,5,0,Math.PI*2,true);
        ctx.fill();
        ctx.stroke();
    }

    create(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start_x, this.start_y);
        this.coordinates.forEach(coordinate => {
            ctx.lineTo(coordinate[0],coordinate[1]);
            ctx.stroke();
            ctx.moveTo(coordinate[0],coordinate[1]);
            ctx.beginPath();
        });
        this.ctx.stroke();
    }

    lastCoodinates() {
        return this.coordinates.slice(-1)[0]; 
    }

    draw() {

    }

}

export { standObject }