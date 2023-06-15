import { Chair } from "./GraphicObject.js";

class StandEditor {
    canvas;
    ctx;
    chairBottom;
    graphicObjectslist = []; // Массив графических обьектов 
    createObjectt = null;
    selectObject = null;
    canvasWidth;
    canvasHeight;

    constructor(graphicObjectslist) {
        if (graphicObjectslist === undefined) {
            console.log("Данных для подгрузки нет");
        } else {
            this.graphicObjectslist = graphicObjectslist;
        }
    }

    draw() {
        if (this.graphicObjectslist.length !== 0) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.graphicObjectslist.forEach(object => {
                object.draw(this.ctx);
            });
        }
    }

    sizeCanvas() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight - 85;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        console.log(this.canvasWidth);
    }


    // Одиночное нажатие на канвас
    clickOnCanvas() {
        if (this.createObjectt != null) {
            this.graphicObjectslist.push(this.createObjectt(this.m_x, this.m_y));
            if (this.selectObject != null) {
                this.selectObject.chosen();
                this.selectObject = null;
            }
            this.draw();
        }

        if (this.createObjectt == null) {
            if (this.selectObject == null) {
                this.graphicObjectslist.forEach(graphicObject => {
                    if ((this.m_x >= graphicObject.x) &&
                        (this.m_y >= graphicObject.y) &&
                        (this.m_x <= graphicObject.width + graphicObject.x) &&
                        (this.m_y <= graphicObject.height + graphicObject.y)
                    ) {
                        this.selectObject = graphicObject;
                        this.selectObject.chosen();
                        this.draw();
                    };
                });
            } else if (this.selectObject != null) {
                this.selectObject.chosen();
                this.selectObject = null;
                this.draw();
            }
        }
        this.createObjectt = null;
    }

    moveObject() {

    }

    start() {
        this.canvas = document.getElementById('workspace-canvas');

        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight - 85;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        window.onresize = () => {
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight - 85;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this.draw();
        };

        this.ctx = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousemove', (e) => {
            this.m_x = e.pageX - e.target.offsetLeft;
            this.m_y = e.pageY - e.target.offsetTop;
        });

        this.canvas.addEventListener('click', () => {
            this.clickOnCanvas();
        })

        this.canvas.addEventListener('dblclick', () => {
            this.choseObject();
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