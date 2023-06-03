class GraphicObject {
    x;
    y;
    width;
    height;
    name;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }1
    get name() {
        return this.name;
    }
    draw() {
        app.ctx.fillStyle = '#000';
        app.ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
    rename() { }
    move() { }
    delete() { }
    showInfo() {
        alert(this.name);
    }
}

class Chair extends GraphicObject {

    constructor(x, y, name) {
        super(x, y);
        this.name = name;
        this.width = 150;
        this.height = 150;
        this.draw();
    }


}

class WorkSpace {
    canvas;
    ctx;
    m_x; // Координаты мыши X
    m_y; // Координаты мыши Y
    objectList = []; // Массив графических элементов 
    constructor() {
        this.canvas = document.getElementById('workspace-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    choseDrawObject(type) {
        this.typeObject = type;
        const AddObject = () => { this.addObject(this.typeObject); }
        this.canvas.addEventListener('mousedown', AddObject);
        this.canvas.addEventListener('mouseup', () => {
            this.canvas.removeEventListener('mousedown', AddObject)
        })
    }

    addObject(type) {
        if (type == 'chair') {
            this.objectList.push(new Chair(this.m_x, this.m_y));
        }
        if (type == 'stand') {

        }


    }
    start() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.m_x = e.pageX - e.target.offsetLeft;
            this.m_y = e.pageY - e.target.offsetTop;
        });
    }
}

const app = new WorkSpace();
app.start();