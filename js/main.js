import { Chair } from "./GraphicObject.js";
import { standObject } from "./standObject.js";
import { standRectObject } from "./standRectObject.js";
import { wallObject } from "./wallObject.js";
import { rulerObject } from "./rulerObject.js";

class StandEditor {
    canvas;
    ctx;
    graphicObjectslist = []; // Массив графических обьектов 
    createObject = null;  // Статус создания обьекта
    selectObject = null;  // Выбранный обьект
    holdObject = null;  // Удерживаемый обьект (для перетаскивания)
    rotateObject = null; // Удерживаемый обьект (для вращения)
    rulerObject = null // Выбрана ли линейка
    canvasWidth; // Ширина canvas
    canvasHeight;  // Высота canvas
    gridLine = 25;
    stepGrid = 25; // Шаг сетки в px 
    startDrawStand; // Проверка на рисование стнеда
    createStand = false;
    stand; // Стенд
    startStandPoint; // Начальная точка для отрисовки стенда
    m_x; // Координаты мыши x
    m_y; // Координаты мыши y
    m_x_l; // Последняя координата мыши x
    m_y_l; // Последняя координата мыши y

    l_s_x = null; // Последняя координата x при рисовании стенда
    l_s_y = null; // Последняя координата y при рисовании стенда

    standWidth; // Ширина стенда
    standHeigh; // высота стенда

    shiftDown = false; // Зажатый шифт
    ctrltDown = false; // Зажатый ctrl
    keyZ = false // зажатая клавиша Z

    editorRightPanel;

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
        if (this.stand != null) { // Если есть стенд
            if (this.stand.created()) {
                this.stand.draw();
            }
        }
        if (this.graphicObjectslist.length !== 0) {  // Проверяет есть ли какие обьекты в памяти
            this.graphicObjectslist.forEach(object => {
                object.draw(this.ctx, 0);
            });
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
            if (this.selectObject != null) {
                this.selectObject.chosen();
                this.selectObject = null;
            }
            if (this.selectObject == null) {
                this.graphicObjectslist.forEach(graphicObject => {
                    if (graphicObject.checkChose(this.m_x, this.m_y)) {
                        this.selectObject = graphicObject;
                        this.selectObject.chosen();
                        this.selectObject.showInfo(this.editorRightPanel);
                    }
                });
            }
            this.draw();
        }
        // Создание стенда
        if (this.createStand) {  // Прорисовка стенда
            if (this.shiftDown) {
                if (Math.abs((this.l_s_x - this.m_x)) > Math.abs((this.l_s_y - this.m_y))) {
                    this.stand.addCoordinates(this.m_x, this.l_s_y);
                }
                if (Math.abs((this.l_s_x - this.m_x)) < Math.abs((this.l_s_y - this.m_y))) {
                    this.stand.addCoordinates(this.l_s_x, this.m_y);
                }
            } else {
                this.stand.addCoordinates(this.m_x, this.m_y);
            }

            this.stand.create();
            if (this.stand.created()) {  // Если стенд уже завершен
                this.createStand = false;
                this.draw();
            }
        }
        // Начало создания стенда ( начальная координата )
        if (this.startDrawStand == true) {
            this.stand = new standObject(this.m_x, this.m_y, this.ctx);
            this.startStandPoint = [this.m_x, this.m_y];
            this.stand.createStartPoint();
            this.startDrawStand = false;
            this.createStand = true;
        }

        // Выбор обьекта для линейки
        if (this.rulerObject == true) {
            if (this.ruler) {
                this.ruler = false;
                this.rulerObject == false;
                console.log(this.ruler);
            } else {
                this.ruler = new rulerObject(this.m_x, this.m_y, this.ctx);
                console.log(this.ruler);
            }

        }

        this.createObject = null;
    }

    // Отслеживание положения мыши на Canvas
    mouseMoveOnCanvas(e) {
        this.m_x = e.pageX - e.target.offsetLeft;
        this.m_y = e.pageY - e.target.offsetTop;

        if (this.holdObject != null) {  // Если перетаскивается обьект
            if (this.shiftDown) {
                this.selectObject.moveHorizontal(this.m_x);
            }
            if (this.ctrltDown) {
                this.selectObject.moveVertical(this.m_y);
            }
            if (this.keyZ) {
                if (this.stand) {
                    if (this.stand.mouseInStand(this.m_x, this.m_y)) {
                        this.selectObject.moveForGridinStand(this.m_x, this.m_y, this.stand);
                    }
                } else {
                    this.selectObject.moveForGrid(this.m_x, this.m_y, this.stepGrid);
                }

            }
            if (!((this.shiftDown) || (this.ctrltDown) || (this.keyZ))) {
                this.selectObject.move(this.m_x, this.m_y);
            }
            this.draw();
        }

        if (this.rotateObject != null) {  // Если вращается обект
            
            if ((this.m_x - this.m_x_l) > (this.m_y - this.m_y_l)) {
                this.selectObject.rotate(-1);
            }
            if ((this.m_x - this.m_x_l) < (this.m_y - this.m_y_l)) {
                this.selectObject.rotate(1);
            }
            this.m_x_l = this.m_x;
            this.m_y_l = this.m_y;

            this.draw();
        }

        if (this.createStand) {  // Если идет создание стенда
            [this.l_s_x, this.l_s_y] = this.stand.lastCoodinates(); // Последнияя точка при рисовании стенда
            this.draw();
            this.stand.create();
            this.stand.createStartPoint();
            // Зажатый шифт
            if (this.shiftDown) {
                if (Math.abs((this.l_s_x - this.m_x)) > Math.abs((this.l_s_y - this.m_y))) {
                    this.stand.drawLine(this.m_x, this.l_s_y);
                }
                if (Math.abs((this.l_s_x - this.m_x)) < Math.abs((this.l_s_y - this.m_y))) {
                    this.stand.drawLine(this.l_s_x, this.m_y);
                }
                // Угол 45
                if (Math.abs(Math.abs((this.l_s_x - this.m_x)) - Math.abs((this.l_s_y - this.m_y))) < 15) {

                }
            } else {
                this.stand.drawLine(this.m_x, this.m_y);
            }

        }

        if (this.ruler) {
            this.draw();
            this.ruler.create(this.m_x, this.m_y);
        }
    }

    mouseDownOnCanvas() {
        if ((this.selectObject != null) && (this.selectObject.checkChose(this.m_x, this.m_y))) {
            this.holdObject = true;
        }
        if ((this.selectObject != null) && (this.selectObject.checkRotate(this.m_x, this.m_y))) {
            this.m_x_l = this.m_x;
            this.m_y_l = this.m_y;
            this.rotateObject = true;
        }
    }

    mouseUpOnCanvas() {
        this.holdObject = null;
        this.rotateObject = null;
    }

    deleteObject() {
        this.index = this.graphicObjectslist.indexOf(this.selectObject);
        this.graphicObjectslist.splice(this.index, 1);
        this.selectObject = null;
        this.draw();
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
                this.shiftDown = false;
            }
            if (e.code == 'ControlLeft') {
                this.ctrltDown = false;
            }
            if (e.code == 'KeyZ') {
                this.keyZ = false;
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code == 'ShiftLeft') {
                this.shiftDown = true;
            }
            if (e.code == 'ControlLeft') {
                this.ctrltDown = true;
            }
            if (e.code == 'KeyZ') {
                this.keyZ = true;
            }
            if (e.code == 'ArrowLeft') {
                if (this.selectObject != null) {
                    this.selectObject.rotate(-1);
                    this.draw();
                }
            }
            if (e.code == 'ArrowRight') {
                if (this.selectObject != null) {
                    this.selectObject.rotate(1);
                    this.draw();
                }
            }
        })


        // Настройки меню
        this.createStandButton = document.getElementById('createStandButton');
        this.createRectStandButton = document.getElementById('createRectStandButton');
        this.chairButtons = Array.from(document.getElementsByClassName('chairButton'));
        this.tableButton = document.getElementById('tableButton');
        this.rulerButton = document.getElementById('rulerButton');
        this.inputSteGrid = document.getElementById('stepGrid');
        this.editorRightPanel = document.getElementById('editor-right-panel');
        this.editorRectStand = document.getElementById('editor-rect-stand');
        this.choseGraphicObject = document.getElementById('chose-graphic-object');
        this.creatRectStand = document.getElementById('creatRectStand');

        // Создать произвольный стенд
        this.createStandButton.addEventListener('click', () => {
            this.startDrawStand = true;
        })

        // Создать стенд по готовым размерам (открывает модальное окно)
        this.createRectStandButton.addEventListener('click', () => {
            this.editorRectStand.style.display = "block";
        })

        // Создать стенд по заданным размерам
        this.creatRectStand.addEventListener('click', () => {
            this.standWidth = document.getElementById('inputStandWidth').value;
            this.standHeight = document.getElementById('inputStandHeight').value;
            this.stand = new standRectObject(this.stepGrid, this.standWidth, this.standHeight, this.ctx);
            this.editorRectStand.style.display = "none";
            this.draw();
        })

        this.inputSteGrid.addEventListener('input', () => {
            this.stepGrid = Number(this.inputSteGrid.value);
            this.draw();
        })


        this.chairButtons.forEach(chairButton => {
            chairButton.addEventListener('click', () => {
                this.createObject = (x, y) => new Chair(x, y, chairButton.dataset.id);
            })
        });

        // this.chairButtons.addEventListener('click', () => {
        //     this.createObject = (x, y) => new Chair(x, y, 1);
        //     this.loadModalObject();
        //     this.choseGraphicObject.style.display = "flex";
        // })

        this.tableButton.addEventListener('click', () => {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        })

        // Создать линейку
        this.rulerButton.addEventListener('click', () => {
            this.rulerObject = true;
        })


        window.onresize = () => {
            this.sizeCanvas();
            this.draw();
        };

        this.draw();

        // this.wall = new wallObject();
        // this.wall.draw(6, 6, this.ctx);

        console.log('Приложение запущено');

    }

}
const app = new StandEditor();
app.start()