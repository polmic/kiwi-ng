import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit {

    grid = [];
    nbRows: number = 80;
    nbCol: number = 60;

    intervalId: number;
    nbStepsPerSec: number = 1;

    canvasWidth = 800;
    canvasHeight = 600;

    constructor() {
    }

    ngOnInit() {
        this._initGrid(this.grid);
        this._initCanvas();
        this._runGameOfLife();
    }

    _runGameOfLife() {
        this.intervalId = setInterval(() => this._refreshGrid(), this.nbStepsPerSec);
    }

    _refreshGrid() {
        const updatedGrid = JSON.parse(JSON.stringify(this.grid));
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbCol; j++) {
                if (this._isCellEvaluable(i, j)) {
                    const nbAlive = this._getNbCellsAlive(i, j);
                    if (this.grid[i][j] === 1) {
                        if (nbAlive < 2 || nbAlive > 3) updatedGrid[i][j] = 0;
                    } else {
                        if (nbAlive === 3) updatedGrid[i][j] = 1;
                    }
                }
            }
        }
        this.grid = updatedGrid;
        this._initCanvas();
    }

    _getNbCellsAlive(i, j) {
        let nbAlive: number = 0;
        if (this.grid[i - 1][j - 1] === 1) nbAlive++;
        if (this.grid[i - 1][j] === 1) nbAlive++;
        if (this.grid[i - 1][j + 1] === 1) nbAlive++;
        if (this.grid[i][j - 1] === 1) nbAlive++;
        if (this.grid[i][j + 1] === 1) nbAlive++;
        if (this.grid[i + 1][j - 1] === 1) nbAlive++;
        if (this.grid[i + 1][j] === 1) nbAlive++;
        if (this.grid[i + 1][j + 1] === 1) nbAlive++;
        return nbAlive;
    }

    _isCellEvaluable(i, j) {
        return (i > 1 && i + 1 < this.nbRows) && (j > 1 && j + 1 < this.nbCol);
    }

    _initGrid(grid) {
        this._initEmptyGrid(grid);
        this._fillStarterGrid();
    }

    _initEmptyGrid(grid) {
        for (let i = 0; i < this.nbRows; i++) {
            grid[i] = [];
        }
    }

    _fillStarterGrid() {
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbCol; j++) {
                // this.grid[i][j] = Math.round(Math.random());
                this.grid[i][j] = 0;
            }
        }
        this._setAcorn();
    }

    _setAcorn() {
        this.grid[40][30] = 1;
        this.grid[41][30] = 1;
        this.grid[41][28] = 1;
        this.grid[43][29] = 1;
        this.grid[44][30] = 1;
        this.grid[45][30] = 1;
        this.grid[46][30] = 1;
    }

    _initCanvas() {
        const canvas = <HTMLCanvasElement>document.getElementById("life-canvas");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this._drawGrid(context);
        this._fillGrid(context);
    }

    _fillGrid(context) {
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbCol; j++) {
                if (this.grid[i][j] === 1) {
                    context.fillStyle = '#ff9b71';
                } else {
                    context.fillStyle = '#ffffff';
                }
                context.fillRect(i*10, j*10, 10, 10);
            }
        }
    }

    _drawGrid(context) {
        for (let x = 0.5; x < this.canvasWidth; x += 10) {
            context.moveTo(x, 0);
            context.lineTo(x, this.canvasHeight);
        }
        for (let y = 0.5; y < this.canvasHeight; y += 10) {
            context.moveTo(0, y);
            context.lineTo(this.canvasWidth, y);
        }
        context.strokeStyle = 'grey';
        context.stroke();
    }
}
