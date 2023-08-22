class GraphicObject {
    x;
    y;
    width = 50;
    height = 50;
    img = new Image();
    chose = false;
    degrees = 0;
    constructor(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;

    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.degrees * Math.PI / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
        if (this.chose) {
            ctx.strokeStyle = "#3C00FF";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();// начало нового пути
            ctx.lineWidth = 2; // толщина обводки
            ctx.strokeStyle = "#3C00FF"; // цвет обводки
            ctx.arc(this.x + this.width, this.y + this.height, 10, 0, Math.PI / 2, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#3C00FF";
            ctx.moveTo(this.x + this.width, this.y + this.height + 7);
            ctx.lineTo(this.x + this.width, this.y + this.height + 13);
            ctx.lineTo(this.x + this.width - 5, this.y + this.height + 10);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "#3C00FF";
            ctx.moveTo(this.x + this.width + 7, this.y + this.height);
            ctx.lineTo(this.x + this.width + 13, this.y + this.height);
            ctx.lineTo(this.x + this.width + 10, this.y + this.height - 5);
            ctx.fill();
        }

    }

    move(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    moveHorizontal(x) {
        this.x = x - this.height / 2;
    }

    moveVertical(y) {
        this.y = y - this.height / 2;
    }

    moveForGrid(x, y, step) {
        this.x = Math.trunc(x / step) * step;
        this.y = Math.trunc(y / step) * step;
    }

    moveForGridinStand(x, y, stand) {
        this.step = stand.stepGrid; // Ширина шага
        this.stand_x = stand.start_x; // Начальная координата x
        this.stand_y = stand.start_y; // Начальная координата y
        this.x = (Math.trunc((x - this.stand_x) / this.step) * this.step) + this.stand_x;
        this.y = (Math.trunc((y - this.stand_y) / this.step) * this.step) + this.stand_y;
    }

    checkChose(x, y) {
        if ((x >= this.x) && (y >= this.y) && (x <= this.width + this.x) && (y <= this.height + this.y)) {
            return true
        } else {
            return false
        }
    }

    checkRotate(x, y) {
        if ((x >= this.x + this.width) &&
            (y >= this.y + this.height) &&
            (x <= this.x + this.width + 15) &&
            (y <= this.y + this.height + 15)) {
            return true
        } else {
            return false
        }
    }

    chosen() {
        if (this.chose) {
            this.chose = false;
        } else {
            this.chose = true;
        }
    }
    showInfo(panel) {
        panel.style.display = "block";
        panel.getElementsByClassName('coordinates-object')[0].innerHTML = this.x;
    }
    hiddenInfo(panel) {
        panel.style.display = "none";
    }

    rotate(degrees) {
        this.degrees += degrees;
    }

}

class Chair extends GraphicObject {
    constructor(x, y, type) {
        super(x, y);
        if (type == 1) {
            this.img.src = "../media/chair.svg";
        }
        if (type == 2) {
            this.img.src = "../media/chair2.svg";
        }
        if (type == 3) {
            this.img.src = "../media/chair3.svg";
        }

    }
}

export { Chair }