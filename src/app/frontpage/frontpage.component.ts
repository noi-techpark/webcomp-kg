import {AfterViewInit, Component, OnInit} from '@angular/core';


@Component({
  selector: 'kg-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class FrontpageComponent implements OnInit, AfterViewInit {

  // @Input() view: string;//  = 'table';
  // @Input() endpoint: string;//  = 'table';
  // @Input() query: string;//  = 'table';

  constructor() {
  }

  ngOnInit() {
    // console.log('ngOnInit(): kgview   :', this.elm.nativeElement.getAttribute('kgview'));
  }

  ngAfterViewInit() {
    // this.view = this.elm.nativeElement.getAttribute('view')
    // this.endpoint = this.elm.nativeElement.getAttribute('endpoint')
    // this.query = this.elm.nativeElement.getAttribute('query')
    // //console.log('ngAfterViewInit(): kgview   :', this.elm.nativeElement.getAttribute('kgview'));
  }

}
