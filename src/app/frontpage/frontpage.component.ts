import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'kg-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class FrontpageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // console.log('ngOnInit(): kgview   :', this.elm.nativeElement.getAttribute('kgview'));
  }

}
