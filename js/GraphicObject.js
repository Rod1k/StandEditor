class GraphicObject {
    x;
    y;
    width = 50; // Границы рисуемого обьекта (ширина)
    height = 50; // Границы рисуемого обьекта (высота)

    border_width = this.width; // Границы рамки (ширина)
    border_height = this.height; // Границы рамки (высота)
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
            ctx.strokeRect((this.x - ((this.border_width - this.width) / 2)), (this.y - ((this.border_height - this.height) / 2)), this.border_width, this.border_height);
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
        this.x = (Math.trunc(x / step) * step) + ((this.border_width - this.width) / 2);
        this.y = Math.trunc(y / step) * step + ((this.border_height - this.height) / 2);
    }

    moveForGridinStand(x, y, stand) {
        this.step = stand.stepGrid; // Ширина шага
        this.stand_x = stand.start_x; // Начальная координата x
        this.stand_y = stand.start_y; // Начальная координата y
        this.x = (Math.trunc((x - this.stand_x) / this.step) * this.step) + this.stand_x + ((this.border_width - this.width) / 2);
        this.y = (Math.trunc((y - this.stand_y) / this.step) * this.step) + this.stand_y + ((this.border_height - this.height) / 2);
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
        if (this.degrees > 360) {
            this.degrees = this.degrees - 360;
        }

        if ((this.degrees <= 90) || (this.degrees <= 270 && this.degrees > 180)) {
            this.rad = this.degrees / 180 * Math.PI;
            this.border_width = ((this.width * Math.cos(this.rad)) +
                (this.width * Math.sin(this.rad)));
            this.border_height = ((this.height * Math.sin(this.rad)) +
                (this.height * Math.cos(this.rad)));
        }
        if ((this.degrees <= 180 && this.degrees > 90) || (this.degrees <= 360 && this.degrees > 270)) {
            this.rad = (180 - this.degrees) / 180 * Math.PI;
            this.border_width = ((this.width * Math.cos(this.rad)) +
                (this.width * Math.sin(this.rad)));
            this.border_height = ((this.height * Math.sin(this.rad)) +
                (this.height * Math.cos(this.rad)));
        }
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