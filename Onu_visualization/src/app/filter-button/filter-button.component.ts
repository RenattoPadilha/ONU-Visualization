import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css'],
})
export class FilterButtonComponent implements OnInit {
  //filter window variable
  @Output() isFilterWindowOpen = new EventEmitter<boolean>();
  //div size
  width = '20vw';
  height = '8vh';
  //icon position
  icon = faCircleChevronDown;
  iconPosition = 'translateY(-50%) rotate(-180deg)';
  isWindowOpen = false;

  constructor() {}

  ngOnInit(): void {}

  //Change icon position and open window
  buttonClick() {
    this.isWindowOpen = !this.isWindowOpen;
    this.isFilterWindowOpen.emit(this.isWindowOpen);
    if (this.isWindowOpen) {
      this.iconPosition = 'translateY(-50%) rotate(0deg)';
    } else {
      this.iconPosition = 'translateY(-50%) rotate(-180deg)';
    }
  }
}
