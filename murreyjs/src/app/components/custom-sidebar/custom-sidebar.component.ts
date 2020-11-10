import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrls: ['./custom-sidebar.component.scss']
})
export class CustomSidebarComponent implements OnInit {
  stockDataVizTitle = 'stock price visualization';
  audioDataVizTitle = 'audio visualization';
  artworkTitle = 'artwork';

  constructor() { }

  ngOnInit(): void {
  }

}
