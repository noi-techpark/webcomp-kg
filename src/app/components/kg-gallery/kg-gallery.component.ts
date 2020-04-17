import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SelectResultSet} from '../../../model/sparql';
import {SparqlService} from '../../sparql.service';
import {NgImageSliderComponent} from "ng-image-slider";

@Component({
  selector: 'kg-gallery',
  templateUrl: './kg-gallery.component.html',
  styleUrls: ['./kg-gallery.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgGalleryComponent implements OnInit {
  @Input() endpoint: string;

  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResultSet;

  finished = false;

  @ViewChild('nav') slider: NgImageSliderComponent;

  imageObject = [];

  constructor(private sparqlService: SparqlService) {
  }

  ngOnInit() {
    this.sparqlService.endpoint = this.endpoint;
    this.sparqlService.select(this.query)
      .subscribe(value => {
        this.finished = true;
        this.results = value;
        for (let m of this.results.results.bindings) {
          this.imageObject.push({
            image: m['widgetImage'].value,
            thumbImage: m['widgetImage'].value,
            title: m['widgetLabel'].value
          })
        }
      }, error => {
        this.finished = true;
        this.errorMessage = JSON.stringify(error);
      });

  }

}
