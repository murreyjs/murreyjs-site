import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-selection',
  templateUrl: './sidebar-selection.component.html',
  styleUrls: ['./sidebar-selection.component.scss']
})
export class SidebarSelectionComponent implements OnInit {
  @Input() title: string;
  @Input() imageSrc: string;
  @Input() scrollId: string;

  constructor() { }

  ngOnInit(): void {
  }

  scroll(): void {
    const element = document.getElementById(this.scrollId);
    element.scrollIntoView({behavior: 'smooth'});
  }
}
