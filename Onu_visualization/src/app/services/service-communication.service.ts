import { Injectable } from '@angular/core';
import { DrawHeatmapService } from './draw-heatmap.service';
import { CsvManagerService } from './csv-manager.service';
import { SelectedFiltersService } from './selected-filters.service';
import { CategoriesControlService } from './categories-control.service';
import { ScaleControlService } from './scale-control.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCommunicationService {

  constructor(
    private SelectedFiltersService: SelectedFiltersService,
    private CategoriesControlService: CategoriesControlService,
    private CsvManagerService: CsvManagerService,
    private DrawHeatmapService: DrawHeatmapService,
    private ScaleControlService: ScaleControlService
  ) { }

  setupCanvas(canvas: any){
    this.DrawHeatmapService.canvas = canvas;
    this.DrawHeatmapService.ctx = canvas.getContext('2d');
    this.DrawHeatmapService.drawInitialCanvas();
  }

  canvasOnHover(event: any): any{
    let xPosition = event.offsetX;
    let yPosition = event.offsetY;

    let lineHeight = this.DrawHeatmapService.lineHeight;
    let categoryWidth = this.DrawHeatmapService.categoryWidth;
    let yearWidth = this.DrawHeatmapService.yearWidth;
    let timelineHigherPoint = this.DrawHeatmapService.timelineHigherPoint;
    let isDrawedBefore = this.DrawHeatmapService.isDrawedBefore;
    
    //Check if canvas was drawed, if not, tooltip is disabled
    if (isDrawedBefore) {
      //check if is a heatmap celule, if not, tooltip is disabled
      if (xPosition > categoryWidth && yPosition <= timelineHigherPoint) {
        let heatmapOffset = xPosition - categoryWidth;

        let selectedIndexX = Math.floor(yPosition / lineHeight);
        let selectedIndexY = Math.floor(heatmapOffset / yearWidth);
        let newValue = this.CsvManagerService.getCellValue(selectedIndexX,selectedIndexY);

        return {
          tooltipOn: true,
          value: newValue
        }
      }
    }
    return {
      tooltipOn: false,
      value: 0
    }
  }

  canvasOnResize (): any{
    // Set display size (80vw/92vh).
    let sizeWidth = (80 * window.innerWidth) / 100;
    let sizeHeight = (92 * window.innerHeight) / 100;

    //Redraw canvas
    let yearRange = this.SelectedFiltersService.selectedYears;
    let actualCategories = this.CategoriesControlService.categories;
    let dataset = this.CsvManagerService.visibleDataset;
    this.DrawHeatmapService.drawCanvas(yearRange, actualCategories, dataset);

    //Return width and height values
    return {
      width: sizeWidth,
      height: sizeHeight
    }
  }

  //Handle category click
  handleCanvasClick(event: any){
    let xPosition = event.offsetX;
    let yPosition = event.offsetY;

    let lineHeight = this.DrawHeatmapService.lineHeight;
    let categoryWidth = this.DrawHeatmapService.categoryWidth;
    let yearWidth = this.DrawHeatmapService.yearWidth;
    let timelineHigherPoint = this.DrawHeatmapService.timelineHigherPoint;
    let isDrawedBefore = this.DrawHeatmapService.isDrawedBefore;

    //Check if canvas was drawed
    if (isDrawedBefore) {
      //Check if is a categorie
      if (xPosition <= categoryWidth && yPosition <= timelineHigherPoint) {
        let selectedIndex = Math.floor(yPosition / lineHeight);
        let actualCategories = this.CategoriesControlService.categories;
        let yearRange = this.SelectedFiltersService.selectedYears;
        let titleClicked = actualCategories[selectedIndex];

        //Check if is a category or subcategorie
        if (this.CategoriesControlService.isCategory(titleClicked)) {
          this.CategoriesControlService.removeCategory(titleClicked);
        } else{
          this.CategoriesControlService.removeSubCategories(titleClicked);
        }

        //Att visible data and redrawing on screen
        this.CsvManagerService.attVisibleDataset(actualCategories);
        this.DrawHeatmapService.drawCanvas(yearRange, actualCategories, this.CsvManagerService.visibleDataset);
        
      } else if (yPosition <= timelineHigherPoint) {
        /*check if is a heatmap celule
        let heatmapOffset = xPosition - categoryWidth;
        //let categories = this.CategoriesControlService.categories;
        //let lowerYear = this.SelectedFiltersService.selectedYears[0];

        let selectedIndexX = Math.floor(heatmapOffset / yearWidth);
        let selectedIndexY = Math.floor(yPosition / lineHeight);

        //console.log(lowerYear+selectedIndexX,categories[selectedIndexY]);
        //Future Call to Speech-Bar service
        */
      }
    }
  }

  handleSearch(){
    let actualCategories = this.CategoriesControlService.categories;
    let yearRange = this.SelectedFiltersService.selectedYears;
    this.CsvManagerService.makeSearch(actualCategories, yearRange, [["the", 0], ["i", 0], ["total", 0]]);
    let dataset = this.CsvManagerService.visibleDataset;
    this.ScaleControlService.attScale("Purples", 0, 100000);

    this.DrawHeatmapService.isDrawedBefore = true;
    this.DrawHeatmapService.drawCanvas(yearRange, actualCategories, dataset);
    this.ScaleControlService.drawScale();
  }

  attFilters(selectedType: string, yearRange: Array<number>, selectedWords: any){
    this.SelectedFiltersService.selectedType = selectedType;
    this.SelectedFiltersService.selectedYears = yearRange;
    this.SelectedFiltersService.selectedWords = selectedWords;
  }

}
