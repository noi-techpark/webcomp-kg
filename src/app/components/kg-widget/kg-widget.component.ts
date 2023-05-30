// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

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
