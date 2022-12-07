import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DrawHeatmapService } from '../services/draw-heatmap.service';
import { CategoriesControlService } from '../services/categories-control.service';
import { SelectedFiltersService } from '../services/selected-filters.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  constructor(
    private SelectedFiltersService: SelectedFiltersService,
    private DrawHeatmapService: DrawHeatmapService,
    private CategoriesControlService: CategoriesControlService
  ) {}

  private canvas: any;

  ngOnInit(): void {
    this.canvas = d3.select('.teste').node();

    this.DrawHeatmapService.canvas = this.canvas;
    this.DrawHeatmapService.ctx = this.canvas.getContext('2d');
    this.DrawHeatmapService.drawInitialCanvas();
  }

  @HostListener('window:resize', ['$event'])
  resizeCanvas() {
    // Set display size (80vw/92vh).
    let sizeWidth = (80 * window.innerWidth) / 100;
    let sizeHeight = (92 * window.innerHeight) / 100;

    //Setting the canvas site and width to be responsive
    this.canvas.width = sizeWidth;
    this.canvas.height = sizeHeight;
    this.canvas.style.width = sizeWidth;
    this.canvas.style.height = sizeHeight;

    //Redraw canvas
    this.DrawHeatmapService.drawCanvas();
  }

  @HostListener('click', ['$event'])
  handleClick(event: any) {
    let xPosition = event.offsetX;
    let yPosition = event.offsetY;

    let categoryHeight = this.DrawHeatmapService.categoryHeight;
    let categoryWidth = this.DrawHeatmapService.categoryWidth;
    let yearWidth = this.DrawHeatmapService.yearWidth;
    let timelineHigherPoint = this.DrawHeatmapService.timelineHigherPoint;
    let isDrawedBefore = this.DrawHeatmapService.isDrawedBefore;

    //Check if canvas was drawed
    if (isDrawedBefore) {
      //Check if is a categorie
      if (xPosition <= categoryWidth) {
        let categories = this.CategoriesControlService.categories;
        let selectedIndex = Math.floor(yPosition / categoryHeight);

        this.CategoriesControlService.handleClick(categories[selectedIndex]);
        this.DrawHeatmapService.drawCanvas();
      } else if (yPosition <= timelineHigherPoint) {
        //check if is a heatmap celule
        let heatmapOffset = xPosition - categoryWidth;
        let categories = this.CategoriesControlService.categories;
        let lowerYear = this.SelectedFiltersService.selectedYears[0];

        let selectedIndexX = Math.floor(heatmapOffset / yearWidth);
        let selectedIndexY = Math.floor(yPosition / categoryHeight);

        //console.log(lowerYear+selectedIndexX,categories[selectedIndexY]);
        //Future Call to Speech-Bar service
      }
    }
  }
}
