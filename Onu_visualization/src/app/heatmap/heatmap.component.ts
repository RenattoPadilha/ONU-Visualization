import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    this.setUpCanvas();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setUpCanvas();
  }

  setUpCanvas() {  
    let canvas: any;

    canvas = d3.select(".teste").node();
    const context: any = canvas.getContext("2d");

    // Set display size (vw/vh).
    let sizeWidth = 80 * window.innerWidth/100
    let sizeHeight = 92 * window.innerHeight/100;
  
    console.log(sizeWidth, sizeHeight);
    //Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    canvas.style.width = sizeWidth;
    canvas.style.height = sizeHeight;
  }
}
