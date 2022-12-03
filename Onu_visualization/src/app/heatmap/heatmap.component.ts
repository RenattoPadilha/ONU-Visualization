import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SelectedFiltersService } from '../services/selected-filters.service';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  constructor(private SelectedFiltersService: SelectedFiltersService) {
    this.categoryHeight = 0;
    this.categoryWidth = 0;
    this.yearWidth = 0;
    this.timelineHigherPoint = 0;
  }

  canvas: any;
  ctx: any;
  categoryHeight: number;
  categoryWidth: number;
  yearWidth: number;
  timelineHigherPoint: number;

  ngOnInit(): void {
    this.canvas = d3.select('.teste').node();
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    let canvasWidth = this.canvas.width;
    let canvasHeight = this.canvas.height;
    let actualCategories = this.SelectedFiltersService.getCategories();
    let yearRange = this.SelectedFiltersService.getYearRange();

    this.categoryHeight = canvasHeight / (actualCategories.length + 1);
    this.categoryWidth = (canvasWidth * 20) / 100;

    this.yearWidth = (canvasWidth* 80)/100/(yearRange[1]-yearRange[0]+1);

    this.drawCategory();
    this.drawTimeline();
    this.drawHeatmapLines();
  }

  @HostListener('window:resize', ['$event'])
  resizeCanvas() {
    // Set display size (vw/vh).
    let sizeWidth = (80 * window.innerWidth) / 100;
    let sizeHeight = (92 * window.innerHeight) / 100;

    //Setting the canvas site and width to be responsive
    this.canvas.width = sizeWidth;
    this.canvas.height = sizeHeight;
    this.canvas.style.width = sizeWidth;
    this.canvas.style.height = sizeHeight;
  }

  cleanCanvas() {}

  drawCategory() {
    let canvasHeight = this.canvas.height;
    let actualCategories = this.SelectedFiltersService.getCategories();

    //drawing categories rectangles
    this.ctx.fillStyle = '#5b92e5';
    this.ctx.rect(0, 0, this.categoryWidth, canvasHeight);
    this.ctx.fill();

    //drawing categories lines
    this.ctx.beginPath();
    this.ctx.lineWidth = '1';
    this.ctx.strokeStyle = 'white';
    this.ctx.moveTo(this.categoryWidth, 0);
    this.ctx.lineTo(this.categoryWidth, canvasHeight);

    for (let index = 0; index < actualCategories.length + 1; index++) {
      this.ctx.moveTo(0, this.categoryHeight * index);
      this.ctx.lineTo(this.categoryWidth, this.categoryHeight * index);
    }
    this.ctx.stroke();

    //drawing categories text
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    for (let index = 0; index < actualCategories.length; index++) {
      let categoryTitle = actualCategories[index];

      this.ctx.font = '1.5rem sans-serif';
      this.ctx.fillText(
        categoryTitle,
        this.categoryWidth / 2,
        this.categoryHeight * index + this.categoryHeight / 2
      );

      this.ctx.font = '1rem sans-serif';
      this.ctx.fillText(
        'Expandir',
        this.categoryWidth / 2,
        this.categoryHeight * index + (this.categoryHeight * 3) / 4
      );
    }
  }

  drawTimeline() {
    let canvasWidth = this.canvas.width;
    let canvasHeight = this.canvas.height;

    let yearRange = this.SelectedFiltersService.getYearRange();
    let qtdYears = yearRange[1] - yearRange[0] + 2;
    let lowerYear = yearRange[0];
    let higherYear = yearRange[1];

    this.timelineHigherPoint = canvasHeight - this.categoryHeight;

    //fill background
    this.ctx.fillStyle = '#5b92e5';
    this.ctx.rect(0, this.timelineHigherPoint, canvasWidth, canvasHeight);
    this.ctx.fill();

    //drawing year lines
    this.ctx.beginPath();
    this.ctx.lineWidth = '1';
    this.ctx.strokeStyle = 'white';
    this.ctx.moveTo(this.categoryWidth, this.timelineHigherPoint);
    this.ctx.lineTo(canvasWidth, this.timelineHigherPoint);
    this.ctx.stroke();

    for (let index = 0; index < qtdYears; index++) {
      this.ctx.moveTo(
        this.categoryWidth + this.yearWidth * index,
        this.timelineHigherPoint
      );
      this.ctx.lineTo(
        this.categoryWidth + this.yearWidth * index,
        canvasHeight
      );
    }
    this.ctx.stroke();

    //drawing text
    this.ctx.fillStyle = 'white';
    for (let index = 0; lowerYear <= higherYear; index++) {
      this.ctx.save();
      this.ctx.translate(
        this.categoryWidth + this.yearWidth * index + this.yearWidth / 2,
        this.timelineHigherPoint + this.categoryHeight / 2
      );
      if (this.yearWidth > 55) {
        this.ctx.font = '1.25rem sans-serif';
        this.ctx.textAlign = 'center';
      } else if (this.yearWidth > 45) {
        this.ctx.font = '1rem sans-serif';
        this.ctx.textAlign = 'center';
      } else if (this.yearWidth > 30){
        this.ctx.rotate(-Math.PI / 2)
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '1.25rem sans-serif';
      } else {
        this.ctx.rotate(-Math.PI / 2)
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '1rem sans-serif';
      }
      this.ctx.fillText(lowerYear, 0, 0);
      this.ctx.restore();

      lowerYear++;
    }
  }

  drawHeatmapLines() {
    let canvasWidth = this.canvas.width;
    let canvasHeight = this.canvas.height;

    //ver quantos quadrados tem
    let actualCategories = this.SelectedFiltersService.getCategories();
    let yearRange = this.SelectedFiltersService.getYearRange();
    let qtdYears = yearRange[1] - yearRange[0] + 1;

    this.ctx.beginPath();
    this.ctx.lineWidth = '1';
    this.ctx.strokeStyle = 'gray';
    
  
    for (let indexLine = 0; indexLine < actualCategories.length; indexLine++) {
      this.ctx.save();
      this.ctx.translate(this.categoryWidth, this.categoryHeight*indexLine);
      this.ctx.moveTo(0,0);
      this.ctx.lineTo(canvasWidth, 0);
      this.ctx.restore();
    }
    for (let indexColumn = 0; indexColumn < qtdYears; indexColumn++) {
      this.ctx.save();
      this.ctx.translate(this.categoryWidth + this.yearWidth*indexColumn, 0);
      this.ctx.moveTo(0,0);
      this.ctx.lineTo(0, this.timelineHigherPoint);
      this.ctx.restore();
    }

    this.ctx.restore();
    this.ctx.stroke();
  }
}
