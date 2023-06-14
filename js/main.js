import { Chair } from "./GraphicObject.js";

class StandEditor {
    canvas;
    ctx;
    chairBottom;
    graphicObjectslist = []; // Массив графических обьектов 
    createObjectt = null;
    selectObject = null;

    constructor(graphicObjectslist) {
        if (graphicObjectslist === undefined) {
            console.log("Данных для подгрузки нет");
        } else {
            this.graphicObjectslist = graphicObjectslist;
        }

    }

    draw() {
        if (this.graphicObjectslist.length !== 0) {
            this.ctx.clearRect(0, 0, 500, 400);
            this.graphicObjectslist.forEach(object => {
                object.draw(this.ctx);
            });
            console.log('Данные подгружены');
        }
    }

    clickOnCanvas() {
        if (this.createObjectt != null) {
            this.graphicObjectslist.push(this.createObjectt(this.m_x, this.m_y));
            this.draw();
        }
        if (this.selectObject == true) {
            this.graphicObjectslist.forEach(graphicObject => {
                if ((this.m_x >= graphicObject.x) &&
                    (this.m_y >= graphicObject.y) &&
                    (this.m_x <= graphicObject.width + graphicObject.x) &&
                    (this.m_y <= graphicObject.height + graphicObject.y)
                );
            });
        }
        this.createObjectt = null;
        this.selectObject = true;
    }

    choseObject() {

    }

    start() {
        this.canvas = document.getElementById('workspace-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousemove', (e) => {
            this.m_x = e.pageX - e.target.offsetLeft;
            this.m_y = e.pageY - e.target.offsetTop;
        });
        this.canvas.addEventListener('click', () => {
            this.clickOnCanvas();
        })

        this.chairButton = document.getElementById('chairButton');
        this.tableButton = document.getElementById('tableButton');
        this.chairButton.addEventListener('click', () => {
            this.createObjectt = (x, y) => new Chair(x, y);
        })
        console.log('Приложение запущено');
    }

}
const app = new StandEditor();
app.start()