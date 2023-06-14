class GraphicObject {
    x;
    y;
    width = 25;
    height = 25;
    constructor(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, 25 ,25);
    }
    rename() { }
    move() { }
    delete() { }
}

class Chair extends GraphicObject {
    constructor(x, y, name) {
        super(x, y);
        this.name = name;
    }
    showInfo() {
        alert(123);
    }
}

export { Chair }