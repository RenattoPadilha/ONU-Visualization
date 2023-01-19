import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { ScaleControlService } from '../services/scale-control.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private ScaleControlService: ScaleControlService) { }

  ngOnInit(): void {
  }  
  
  isFilterWindowOpen = false; 
 
  attWindowState (actualState: boolean){
    this.isFilterWindowOpen = actualState;
  }
}
