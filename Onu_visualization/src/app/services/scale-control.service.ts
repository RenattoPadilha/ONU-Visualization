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

  ramp(qtdColors = 256) {
    let canvas: any;
    let colors: string[];

    const interpolate = (d3 as any)[`interpolate${this._scaleName}`];
    colors = [];

    for (let i = 0; i < qtdColors; ++i) {
      colors.push(d3.rgb(interpolate(i / (qtdColors - 1))).formatHex());
    }
    canvas = document.createElement("canvas");
    const context: any = canvas.getContext("2d");
    const barHeight = canvas.height;


    for (let i = 0; i < qtdColors; i++) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, canvas.width, barHeight);
    }
    return canvas;
  }

// Copyright 2021, Observable Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/color-legend
  /*
    Espaço para title é desnecessario
    Problema com Width
  */

  Legend(color: any, {
  title,
  tickSize = 6,
  marginTop = 0,
  marginRight = 5,
  marginLeft = 5,
  tickFormat,
  tickValues
}: any = {}) {

  
  const svg = d3.select("svg");
  let widthString = svg.style("width"); 
  let heightString = svg.style("height"); 

  let width = ((widthString.length > 2) ? Number( widthString.substring( 0, widthString.length - 2 ) ) : 0 ) - marginLeft - marginRight;
  let height = ((heightString.length > 2) ? Number( heightString.substring( 0, heightString.length - 2 ) ) : 0)*4/5 + tickSize;
  let marginBottom = ((heightString.length > 2) ? Number( heightString.substring( 0, heightString.length - 2 ) ) : 0)*1/5 + tickSize;

  const ticks = width / 64;

  let tickAdjust = (g:any) => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height); 

  // Sequential
  let x = Object.assign(this._scale.copy()
      .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {range() { return [marginLeft, width - marginRight]; }});

  svg.append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", this.ramp().toDataURL());

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
}
}
