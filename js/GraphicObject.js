class GraphicObject {
    x;
    y;
    width = 50;
    height = 50;
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
        this.x = Math.trunc( x / step) * step;
        this.y = Math.trunc( y / step) * step;
    }

    checkChose(x, y) {
        if ((x >= this.x) && (y >= this.y) && (x <= this.width + this.x) && (y <= this.height + this.y)) {
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
        console.log(this.x);
    }
    hiddenInfo(panel) {
        panel.style.display = "none";
    }

    rotate() {
        this.ctx.save();
        // Сдвигаем все адресованные пиксели на указанные значения
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        // Поворачиваем на `degrees` наш градус
        this.ctx.rotate(45 * Math.PI / 180);
        // Рисуем повернутую картинку
        this.ctx.drawImage(this.img, 50, 50, 50, 50);
        // Восстанавливаем настройки на момент когда делали `ctx.save`
        // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
        this.ctx.restore();
    }

}

class Chair extends GraphicObject {
    constructor(x, y) {
        super(x, y);
        this.img.src = "../media/chair-icon.svg";
    }
    
}

export { Chair }