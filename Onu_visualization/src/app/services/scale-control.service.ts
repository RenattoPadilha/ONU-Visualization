import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class ScaleControlService {
  constructor() {}

  private _scale: any = d3.scaleSequential().domain([0, 1]);
  private _scaleName: 'Purples' | 'RdYlGn' = 'Purples';
  private _canvasReference: any;

  set canvasReference(newReference: any) {
    this._canvasReference = newReference;
  }

  attScale(scaleName: 'Purples' | 'RdYlGn', minValue: number, maxValue: number) {
    this._scale = d3
      .scaleSequential(d3[`interpolate${scaleName}`])
      .domain([minValue, maxValue]);
    this._scaleName = scaleName;
  }

  drawScale() {
    let qtdColors = 256;
    let colors: string[];
    let canvas: any;

    const interpolate = (d3 as any)[`interpolate${this._scaleName}`];
    colors = [];

    for (let i = 0; i < qtdColors; ++i) {
      colors.push(d3.rgb(interpolate(i / (qtdColors - 1))).formatHex());
    }
    canvas = d3.select("canvas").node();
    const context: any = canvas.getContext("2d");
    const barHeight = canvas.height;


    for (let i = 0; i < qtdColors; i++) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, canvas.width, barHeight);
    }
  }

  colorInScale(value: number): string {
    if (!value || value == 0) {
      return '#BEBEBE';
    }
    return this._scale(value);
  }
}
