import { Injectable } from '@angular/core';
import { CategoriesControlService } from './categories-control.service';
import { SelectedFiltersService } from './selected-filters.service';

@Injectable({
  providedIn: 'root'
})
export class DrawHeatmapService {

  constructor (private SelectedFiltersService: SelectedFiltersService, private CategoriesControlService: CategoriesControlService) { 
    this._categoryHeight = 0;
    this._categoryWidth = 0;
    this._yearWidth = 0;
    this._timelineHigherPoint = 0;
    this._isDrawedBefore = false;
  }

  private _canvas: any;
  private _ctx: any;
  private _categoryHeight: number;
  private _categoryWidth: number;
  private _yearWidth: number;
  private _timelineHigherPoint: number;
  private _isDrawedBefore: boolean;
  
  
  get categoryHeight() : number {
    return  this._categoryHeight;
  }
  
  
  get categoryWidth() : number {
    return this._categoryWidth;
  }
  
  
  get yearWidth() : number {
    return this._yearWidth;
  }
  
  
  get timelineHigherPoint() : number {
    return this._timelineHigherPoint;
  }
  
  
  get isDrawedBefore() : boolean {
    return this._isDrawedBefore;
  }
  

  set canvas(newValue : any) {
    this._canvas = newValue;
  }
  
  set ctx(newValue : any) {
    this._ctx = newValue;
  }

  set isDrawedBefore(newValue : boolean) {
    this._isDrawedBefore = newValue;
  }

  //Clean entire canvas
  cleanCanvas() {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    this._ctx.clearRect(0,0,canvasWidth, canvasHeight);
  }

  //Draw Categories on Canvas
  drawCategory() {
    let canvasHeight = this._canvas.height;
    let actualCategories = this.CategoriesControlService.categories;

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
      this._ctx.moveTo(0, this._categoryHeight * index);
      this._ctx.lineTo(this._categoryWidth, this._categoryHeight * index);
    }
    this._ctx.stroke();

    //drawing categories text
    this._ctx.textAlign = 'center';
    this._ctx.fillStyle = 'white';
    for (let index = 0; index < actualCategories.length; index++) {
      let categoryTitle = actualCategories[index];

      this._ctx.font = '1.5rem sans-serif';
      this._ctx.fillText(
        categoryTitle,
        this._categoryWidth / 2,
        this._categoryHeight * index + this._categoryHeight / 2
      );

      this._ctx.font = '1rem sans-serif';
      this._ctx.fillText(
        'Expandir',
        this._categoryWidth / 2,
        this._categoryHeight * index + (this._categoryHeight * 3) / 4
      );
    }
  }

  //Draw Timeline on Canvas
  drawTimeline() {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    let yearRange = this.SelectedFiltersService.selectedYears;
    let qtdYears = yearRange[1] - yearRange[0] + 2;
    let lowerYear = yearRange[0];
    let higherYear = yearRange[1];

    this._timelineHigherPoint = canvasHeight - this._categoryHeight;

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
        this._timelineHigherPoint + this._categoryHeight / 2
      );
      if (this._yearWidth > 55) {
        this._ctx.font = '1.25rem sans-serif';
        this._ctx.textAlign = 'center';
      } else if (this._yearWidth > 45) {
        this._ctx.font = '1rem sans-serif';
        this._ctx.textAlign = 'center';
      } else if (this._yearWidth > 30){
        this._ctx.rotate(-Math.PI / 2)
        this._ctx.textBaseline = 'middle';
        this._ctx.font = '1.25rem sans-serif';
      } else {
        this._ctx.rotate(-Math.PI / 2)
        this._ctx.textBaseline = 'middle';
        this._ctx.font = '1rem sans-serif';
      }
      this._ctx.fillText(lowerYear, 0, 0);
      this._ctx.restore();

      lowerYear++;
    }
  }

  //Draw Heatmpap Lines on Canvas
  drawHeatmapLines() {
    let canvasWidth = this._canvas.width;
    let canvasHeight = this._canvas.height;

    //ver quantos quadrados tem
    let actualCategories = this.CategoriesControlService.categories;
    let yearRange = this.SelectedFiltersService.selectedYears;
    let qtdYears = yearRange[1] - yearRange[0] + 1;

    this._ctx.beginPath();
    this._ctx.lineWidth = '1';
    this._ctx.strokeStyle = 'gray';
    
  
    for (let indexLine = 0; indexLine < actualCategories.length; indexLine++) {
      this._ctx.save();
      this._ctx.translate(this._categoryWidth, this._categoryHeight*indexLine);
      this._ctx.moveTo(0,0);
      this._ctx.lineTo(canvasWidth, 0);
      this._ctx.restore();
    }
    for (let indexColumn = 0; indexColumn < qtdYears; indexColumn++) {
      this._ctx.save();
      this._ctx.translate(this._categoryWidth + this._yearWidth*indexColumn, 0);
      this._ctx.moveTo(0,0);
      this._ctx.lineTo(0, this._timelineHigherPoint);
      this._ctx.restore();
    }

    this._ctx.restore();
    this._ctx.stroke();
  }

  //Draw text on Canvas
  drawInitialCanvas(){
    // Set display size (80vw/92vh).
    let sizeWidth = (80 * window.innerWidth) / 100;
    let sizeHeight = (92 * window.innerHeight) / 100;

    //Setting the canvas site and width to be responsive
    this._canvas.width = sizeWidth;
    this._canvas.height = sizeHeight;
    this._canvas.style.width = sizeWidth;
    this._canvas.style.height = sizeHeight;
    
    this._ctx.font = "2rem sans-serif";
    this._ctx.textAlign = 'center';
    this._ctx.fillText("Select Filters to create a Heatmap", this._canvas.width/2, this._canvas.height/2);
  }
  //Draw Category, Heatmap and Timeline on Canvas 
  drawCanvas(){
    //Clean Canvas
    this.cleanCanvas();

    if (this._isDrawedBefore) {
      let canvasWidth = this._canvas.width;
      let canvasHeight = this._canvas.height;
      let actualCategories = this.CategoriesControlService.categories;
      let yearRange = this.SelectedFiltersService.selectedYears;

      this._categoryHeight = canvasHeight / (actualCategories.length + 1);
      this._categoryWidth = (canvasWidth * 20) / 100;

      this._yearWidth = (canvasWidth* 80)/100/(yearRange[1]-yearRange[0]+1);

      this.drawCategory();
      this.drawTimeline();
      this.drawHeatmapLines();
    }
    else{
      this.drawInitialCanvas();
    }    
  }
}
