import { Injectable } from '@angular/core';
import { CategoriesControlService } from './categories-control.service';
import { ScaleControlService } from './scale-control.service';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class DrawHeatmapService {
  constructor(
    private CategoriesControlService: CategoriesControlService,
    private ScaleControlService: ScaleControlService
  ) {
    this._lineHeight = 0;
    this._categoryWidth = 0;
    this._yearWidth = 0;
    this._timelineHigherPoint = 0;
    this._isDrawedBefore = false;
  }

  private _canvas: any;
  private _ctx: any;
  private _lineHeight: number;
  private _categoryWidth: number;
  private _yearWidth: number;
  private _timelineHigherPoint: number;
  private _isDrawedBefore: boolean;

  get lineHeight(): number {
    return this._lineHeight;
  }

  get categoryWidth(): number {
    return this._categoryWidth;
  }

  get yearWidth(): number {
    return this._yearWidth;
  }

  get timelineHigherPoint(): number {
    return this._timelineHigherPoint;
  }

  get isDrawedBefore(): boolean {
    return this._isDrawedBefore;
  }

  set canvas(newValue: any) {
    this._canvas = newValue;
  }

  set ctx(newValue: any) {
    this._ctx = newValue;
  }

  set isDrawedBefore(newValue: boolean) {
    this._isDrawedBefore = newValue;
  }

  //Clean entire canvas
  private cleanCanvas() {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    this._ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  //Draw Categories on Canvas
  drawCategory(actualCategories: Array<string>) {
    let canvasHeight = this._canvas.height;

    //drawing categories rectangles
    this._ctx.fillStyle = '#5b92e5';
    this._ctx.rect(0, 0, this._categoryWidth, canvasHeight);
    this._ctx.fill();

    //drawing categories lines
    this._ctx.beginPath();
    this._ctx.lineWidth = '1';
    this._ctx.strokeStyle = 'white';
    this._ctx.moveTo(this._categoryWidth, 0);
    this._ctx.lineTo(this._categoryWidth, canvasHeight);

    for (let index = 0; index < actualCategories.length + 1; index++) {
      this._ctx.moveTo(0, this._lineHeight * index);
      this._ctx.lineTo(this._categoryWidth, this._lineHeight * index);
    }
    this._ctx.stroke();

    //drawing categories text
    this._ctx.textAlign = 'center';
    this._ctx.fillStyle = 'white';
    for (let index = 0; index < actualCategories.length; index++) {
      let categoryTitle = actualCategories[index];

      /*
      if (this.CategoriesControlService.isCategory(categoryTitle)) {
        text = 'Click to expand';
      } else {
        text = 'Click to shrink';
      }
      */

      this._ctx.font =
        '400 1.25rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';

      if (categoryTitle.length > 25) {
        let divisionIndex = 0;

        if (categoryTitle === 'Maintenance Of International Peace And Security') {
          divisionIndex = 28;
        } else if(categoryTitle === 'Russian Federation/Ukraine'){
          divisionIndex = 18
        } else {
          for (let actualIndex = 0, position = 0; actualIndex != -1; actualIndex = categoryTitle.indexOf(" ", position)) {
            if (actualIndex <= 25 && Math.abs(actualIndex-25) < Math.abs(divisionIndex-25)) {
              divisionIndex = actualIndex;
            } 
            position = actualIndex+1;
          }
        }
        let categoryTitle1 = categoryTitle.slice(0, divisionIndex);
        let categoryTitle2 = categoryTitle.slice(divisionIndex);

        this._ctx.textBaseline = 'bottom';
        this._ctx.fillText(
          categoryTitle1,
          this._categoryWidth / 2,
          this._lineHeight * index + (this._lineHeight * 1) / 2
        );

        this._ctx.textBaseline = 'top';
        this._ctx.fillText(
          categoryTitle2,
          this._categoryWidth / 2,
          this._lineHeight * index + (this._lineHeight * 1) / 2
        );
        console.log(categoryTitle.length)
      } else {
        this._ctx.textBaseline = 'middle';
        this._ctx.fillText(
          categoryTitle,
          this._categoryWidth / 2,
          this._lineHeight * index + (this._lineHeight * 1) / 2
        );
      }

      /*
      this._ctx.font =
        '400 1rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
      this._ctx.fillText(
        text,
        this._categoryWidth / 2,
        this._lineHeight * index + (this._lineHeight * 3) / 4
      );
      */
    }
  }

  //Draw Timeline on Canvas
  drawTimeline(yearRange: Array<number>) {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    let qtdYears = yearRange[1] - yearRange[0] + 2;
    let lowerYear = yearRange[0];
    let higherYear = yearRange[1];

    this._timelineHigherPoint = canvasHeight - this._lineHeight;

    //fill background
    this._ctx.fillStyle = '#5b92e5';
    this._ctx.rect(0, this._timelineHigherPoint, canvasWidth, canvasHeight);
    this._ctx.fill();

    //drawing year lines
    this._ctx.beginPath();
    this._ctx.lineWidth = '1';
    this._ctx.strokeStyle = 'white';
    this._ctx.moveTo(this._categoryWidth, this._timelineHigherPoint);
    this._ctx.lineTo(canvasWidth, this._timelineHigherPoint);
    this._ctx.stroke();

    for (let index = 0; index < qtdYears; index++) {
      this._ctx.moveTo(
        this._categoryWidth + this._yearWidth * index,
        this._timelineHigherPoint
      );
      this._ctx.lineTo(
        this._categoryWidth + this._yearWidth * index,
        canvasHeight
      );
    }
    this._ctx.stroke();

    //drawing text
    this._ctx.fillStyle = 'white';
    for (let index = 0; lowerYear <= higherYear; index++) {
      this._ctx.save();
      this._ctx.translate(
        this._categoryWidth + this._yearWidth * index + this._yearWidth / 2,
        this._timelineHigherPoint + this._lineHeight / 2
      );
      if (this._yearWidth > 55) {
        this._ctx.font =
          '1.25rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
        this._ctx.textAlign = 'center';
      } else if (this._yearWidth > 45) {
        this._ctx.font =
          '1rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
        this._ctx.textAlign = 'center';
      } else if (this._yearWidth > 30) {
        this._ctx.rotate(-Math.PI / 2);
        this._ctx.textBaseline = 'middle';
        this._ctx.font =
          '1.25rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
      } else {
        this._ctx.rotate(-Math.PI / 2);
        this._ctx.textBaseline = 'middle';
        this._ctx.font =
          '1rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
      }
      this._ctx.fillText(lowerYear, 0, 0);
      this._ctx.restore();

      lowerYear++;
    }
  }

  //Draw Heatmpap Lines on Canvas
  drawHeatmapLines(yearRange: Array<number>, actualCategories: Array<string>) {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    //ver quantos quadrados tem
    let qtdYears = yearRange[1] - yearRange[0] + 1;

    this._ctx.beginPath();
    this._ctx.lineWidth = '1';
    this._ctx.strokeStyle = 'gray';

    for (let indexLine = 0; indexLine < actualCategories.length; indexLine++) {
      this._ctx.save();
      this._ctx.translate(this._categoryWidth, this._lineHeight * indexLine);
      this._ctx.moveTo(0, 0);
      this._ctx.lineTo(canvasWidth, 0);
      this._ctx.restore();
    }
    for (let indexColumn = 0; indexColumn < qtdYears; indexColumn++) {
      this._ctx.save();
      this._ctx.translate(
        this._categoryWidth + this._yearWidth * indexColumn,
        0
      );
      this._ctx.moveTo(0, 0);
      this._ctx.lineTo(0, this._timelineHigherPoint);
      this._ctx.restore();
    }

    this._ctx.restore();
    this._ctx.stroke();
  }

  //Draw text on Canvas
  drawInitialCanvas() {
    // Set display size (80vw/92vh).
    let sizeWidth = (80 * window.innerWidth) / 100;
    let sizeHeight = (92 * window.innerHeight) / 100;

    //Setting the canvas site and width to be responsive
    this._canvas.width = sizeWidth;
    this._canvas.height = sizeHeight;
    this._canvas.style.width = sizeWidth;
    this._canvas.style.height = sizeHeight;

    this._ctx.font =
      '2rem "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif';
    this._ctx.textAlign = 'center';
    this._ctx.fillText(
      'Select Filters to create a Heatmap',
      this._canvas.width / 2,
      this._canvas.height / 2
    );
  }

  drawHeatmap(dataset: any) {
    this._ctx.save();
    this._ctx.translate(this._categoryWidth, 0);

    for (let indexLine = 0; indexLine < dataset.length; indexLine++) {
      for (
        let indexColumn = 0;
        indexColumn < dataset[indexLine].length;
        indexColumn++
      ) {
        let value = undefined;
        if (dataset[indexLine][indexColumn]) {
          value = dataset[indexLine][indexColumn].count;
        }
        this._ctx.fillStyle = this.ScaleControlService.colorInScale(value);
        this._ctx.fillRect(
          this._yearWidth * indexColumn,
          this._lineHeight * indexLine,
          this._yearWidth,
          this._lineHeight
        );
      }
    }
    this._ctx.restore();
  }

  //Draw Category, Heatmap and Timeline on Canvas
  drawCanvas(
    yearRange: Array<number>,
    actualCategories: Array<string>,
    dataset: any
  ) {
    //Clean Canvas
    this.cleanCanvas();

    if (this._isDrawedBefore) {
      this._canvas.height = this.calculateCanvasHeight(actualCategories);

      let canvasWidth = this._canvas.width;
      let canvasHeight = this._canvas.height;

      this._lineHeight = canvasHeight / (actualCategories.length + 1);
      this._categoryWidth = (canvasWidth * 20) / 100;
      this._yearWidth =
        (canvasWidth * 80) / 100 / (yearRange[1] - yearRange[0] + 1);

      console.log('lineHeight: ' + this._lineHeight);
      this.drawCategory(actualCategories);
      this.drawTimeline(yearRange);
      this.drawHeatmap(dataset);
      this.drawHeatmapLines(yearRange, actualCategories);
    } else {
      this.drawInitialCanvas();
    }
  }

  calculateCanvasHeight(actualCategories: Array<string>): number {
    let originalCanvasHeight = (92 * window.innerHeight) / 100;
    let minLineHeight = 90;

    let temporaryLineHeight =
      originalCanvasHeight / (actualCategories.length + 1);

    //Minimum size to mantain view
    if (temporaryLineHeight < minLineHeight) {
      return minLineHeight * (actualCategories.length + 1);
    }
    return originalCanvasHeight;
  }
}
