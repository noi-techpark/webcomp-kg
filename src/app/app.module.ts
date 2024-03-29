// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from '@angular/common/http';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {KgTableComponent} from './components/kg-table/kg-table.component';
import {KgMapComponent} from './components/kg-map/kg-map.component';
import {KgGalleryComponent} from './components/kg-gallery/kg-gallery.component';
import {KgWidgetComponent} from './components/kg-widget/kg-widget.component';
import {NgImageSliderModule} from 'ng-image-slider';

@NgModule({
  declarations: [KgGalleryComponent, KgMapComponent, KgTableComponent, KgWidgetComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatTableModule, NgImageSliderModule],
  providers: [],
})
export class AppModule  {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const elements: any[] = [
      [KgWidgetComponent, 'kg-widget'],
    ];
    for (const [component, name] of elements) {
      const el = createCustomElement(component, {injector: this.injector});
      customElements.define(name, el);
    }
  }

}
