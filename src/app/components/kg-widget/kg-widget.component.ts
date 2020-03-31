import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'kg-widget',
  templateUrl: './kg-widget.component.html',
  styleUrls: ['./kg-widget.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgWidgetComponent implements OnInit, AfterViewInit {

  @Input() view: string;//  = 'table';
  @Input() endpoint: string;//  = 'table';
  @Input() query: string;//  = 'table';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
