import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ServiceCommunicationService } from '../services/service-communication.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  constructor(
    private ServiceCommunicationService: ServiceCommunicationService
  ) {}

  private canvas: any;
  value: number = 0;
  isTooltipOn: boolean = false;
  tooltipX: string = '0px';
  tooltipY: string = '0px';

  ngOnInit(): void {
    this.canvas = d3.select('.teste').node();

    this.ServiceCommunicationService.setupCanvas(this.canvas);
  }

  @HostListener('window:resize', ['$event'])
  resizeCanvas() {
    let canvasDimensions = this.ServiceCommunicationService.canvasOnResize();

    //Setting the canvas site and width to be responsive
    this.canvas.width = canvasDimensions.width;
    this.canvas.height = canvasDimensions.height;
    this.canvas.style.width = canvasDimensions.width;
    this.canvas.style.height = canvasDimensions.height;
  }

  @HostListener('click', ['$event'])
  handleClick(event: any) {
    this.ServiceCommunicationService.handleCanvasClick(event);
  }

  @HostListener('mousemove', ['$event'])
  onHover(event: any) {
    let hoverWindowInfo = this.ServiceCommunicationService.canvasOnHover(event);

    //Check if value isnt 0, if not, tooltip is disabled
    if (hoverWindowInfo.tooltipOn && hoverWindowInfo.value > 0) {
      this.tooltipX = event.clientX + 'px';
      this.tooltipY = event.clientY + 'px';
      this.value = hoverWindowInfo.value;
      this.isTooltipOn = true;
    } else {
      this.isTooltipOn = false;
    }
  }
  @HostListener('mouseout', ['$event'])
  onOut() {
    //Tooltip should be disabled when mouses leaves canvas
    this.isTooltipOn = false;
  }
}
