import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SelectedFiltersService } from '../services/selected-filters.service';
import { DrawHeatmapService } from '../services/draw-heatmap.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  constructor(private SelectedFiltersService: SelectedFiltersService, private DrawHeatmapService: DrawHeatmapService) {
  }

  canvas: any;

  ngOnInit(): void {
    this.canvas = d3.select('.teste').node();

    this.DrawHeatmapService.canvas = this.canvas;
    this.DrawHeatmapService.ctx = this.canvas.getContext('2d');;
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
}
