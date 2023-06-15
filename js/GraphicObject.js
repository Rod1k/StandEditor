class GraphicObject {
    x;
    y;
    width = 25;
    height = 25;
    img = new Image();
    chose = false;
    constructor(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.chose) {
            ctx.strokeStyle = "green";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
    chosen() {
        if (this.chose) {
            this.chose = false;
        } else {
            this.chose = true;
        }
    }
}

class Chair extends GraphicObject {
    constructor(x, y, name) {
        super(x, y);
        this.name = name;
        this.img.src = "../media/chair-icon.svg";
    }
    showInfo() {
        alert(123);
    }
}

export { Chair }