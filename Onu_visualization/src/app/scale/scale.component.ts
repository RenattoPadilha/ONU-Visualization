import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { interpolateBlues } from 'd3';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.css']
})
export class ScaleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.ramp("Blues");
  }

  ramp(name: string) {
    let qtdColors = 256;
    let colors: string[];
    let canvas: any;
    
    const interpolate = (d3 as any)[`interpolate${name}`];
    colors = [];
    
    for (let i = 0; i < qtdColors; ++i) {
      colors.push(d3.rgb(interpolate(i / (qtdColors - 1))).formatHex());
    }
    
    canvas = d3.select("canvas").node();
    const context: any = canvas.getContext("2d");

    const barHeight = canvas.height;
    const barWidth = canvas.width/256;

    for (let i = 0; i < qtdColors; i++) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, canvas.width, barHeight);
    }
    
  }
}
