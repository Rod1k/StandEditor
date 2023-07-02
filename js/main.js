import { Chair } from "./GraphicObject.js";
import { standObject } from "./standObject.js";

class StandEditor {
    canvas;
    ctx;
    graphicObjectslist = []; // Массив графических обьектов 
    createObject = null;  // Статус создания обьекта
    selectObject = null;  // Выбранный обьект
    holdObject = null;  // Удерживаемый обьект
    canvasWidth; // Ширина canvas
    canvasHeight;  // Высота canvas
    gridLine = 50;
    stepGrid = 50; // Шаг сетки в px 
    startDrawStand; // Проверка на рисование стнеда
    createStand = false;
    stand; // Стенд
    startStandPoint; // Начальная точка для отрисовки стенда
    l_s_x; // Последняя координата x при рисовании стенда
    l_s_y; // Последняя координата y при рисовании стенда

    shiftDown = false; // Зажатый шифт

    constructor(graphicObjectslist) {
        if (graphicObjectslist === undefined) {
            console.log("Данных для подгрузки нет");
        } else {
            this.graphicObjectslist = graphicObjectslist;
        }
    }

    // Полная отрисовка всех элементов на канвасе (предварительно очищает его)
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.grid();
        if (this.graphicObjectslist.length !== 0) {
            this.graphicObjectslist.forEach(object => {
                object.draw(this.ctx);
            });
        } else {

        }
    }

    // Сетка разметки
    grid() {
        if (this.stepGrid == 0) {
            this.stepGrid = 50;
        }
        this.gridLine = this.stepGrid;
        this.ctx.strokeStyle = "#ececec";
        this.ctx.lineWidth = "1"; //толщина линии

        while (this.gridLine <= this.canvasWidth) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.gridLine, 0);
            this.ctx.lineTo(this.gridLine, this.canvasHeight);
            this.ctx.moveTo(0, this.gridLine);
            this.ctx.lineTo(this.canvasWidth, this.gridLine);
            this.gridLine += this.stepGrid;
            this.ctx.stroke(); // обводка линии
        }
    }

    // Высчитывание размера canvas
    sizeCanvas() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight - 85;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
    }

    // Одиночное нажатие на Canvas
    clickOnCanvas() {
        // Создание нового обьекта
        if (this.createObject != null) {
            this.graphicObjectslist.push(this.createObject(this.m_x, this.m_y));
            // Сброс выбраного обьекта при создании нового
            if (this.selectObject != null) {
                this.selectObject.chosen();
                this.selectObject = null;
            }
            this.draw();
        }
        // Проверка на попадание в существующий обьект на canvas
        if (this.createObject == null) {
            if (this.selectObject == null) {
                this.graphicObjectslist.forEach(graphicObject => {
                    if (graphicObject.checkChose(this.m_x, this.m_y)) {
                        this.selectObject = graphicObject;
                        this.selectObject.chosen();
                        this.draw();
                    }
                });
            } else if (this.selectObject != null) {
                this.selectObject.chosen();
                this.selectObject = null;
                this.draw();
            }
        }
        // Создание стенда
        if (this.createStand) {
            this.stand.addCoordinates(this.m_x, this.m_y);
            this.stand.create();
            if (this.stand.created()) {
                this.createStand = false;
            }
        }
        if (this.startDrawStand == true) {
            this.stand = new standObject(this.m_x, this.m_y, this.ctx);
            this.startStandPoint = [this.m_x, this.m_y];
            this.stand.createStartPoint();
            this.startDrawStand = false;
            this.createStand = true;
        }

        this.createObject = null;
    }

    // Отслеживание положения мыши на Canvas
    mouseMoveOnCanvas(e) {
        this.m_x = e.pageX - e.target.offsetLeft;
        this.m_y = e.pageY - e.target.offsetTop;
        if (this.holdObject != null) {
            this.holdObject.move(this.m_x, this.m_y);
            this.draw();
        }
        if (this.stand != null) {

        }
        if (this.createStand) {
            [this.l_s_x, this.l_s_y] = this.stand.lastCoodinates(); // Последнияя точка при рисовании стенда
            this.draw();
            this.stand.create();
            this.stand.createStartPoint();
            this.stand.drawLine(this.m_x, this.m_y);
        }
    }

    mouseDownOnCanvas() {
        if ((this.selectObject != null) && (this.selectObject.checkChose(this.m_x, this.m_y))
        ) {
            this.holdObject = this.selectObject;
        }
    }

    mouseUpOnCanvas() {
        this.holdObject = null;
    }


    deleteObject() {
        this.index = this.graphicObjectslist.indexOf(this.selectObject);
        this.graphicObjectslist.splice(this.index, 1);
        this.draw();
        this.selectObject = null;
    }

    // Методы клавишь
    delKey() {
        if (this.selectObject != null) {
            this.deleteObject();
        }
    }

    start() {
        // Настройки canvas
        this.canvas = document.getElementById('workspace-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sizeCanvas();

        // Настройки событий
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseMoveOnCanvas(e);
        });

        this.canvas.addEventListener('click', () => {
            this.clickOnCanvas();
        })

        this.canvas.addEventListener('mousedown', () => {
            this.mouseDownOnCanvas();
        })

        this.canvas.addEventListener('mouseup', () => {
            this.mouseUpOnCanvas();
        })

        document.addEventListener('keyup', (e) => {
            if (e.code == 'Delete') {
                this.delKey();
            }
            if (e.code == 'ShiftLeft') {
                shiftDown = false;
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code == 'ShiftLeft') {
                shiftDown = true;
            }
        })

        // Настройки меню
        this.createStandButton = document.getElementById('createStandButton');
        this.chairButton = document.getElementById('chairButton');
        this.tableButton = document.getElementById('tableButton');
        this.inputSteGrid = document.getElementById('stepGrid');

        this.createStandButton.addEventListener('click', () => {
            this.startDrawStand = true;
        })

        this.inputSteGrid.addEventListener('input', () => {
            this.stepGrid = Number(this.inputSteGrid.value);
            this.draw();
        })

        this.chairButton.addEventListener('click', () => {
            this.createObject = (x, y) => new Chair(x, y);
        })
        this.tableButton.addEventListener('click', () => {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        })

        window.onresize = () => {
            this.sizeCanvas();
            this.draw();
        };

        this.draw();

        console.log('Приложение запущено');

    }

}
const app = new StandEditor();
app.start()