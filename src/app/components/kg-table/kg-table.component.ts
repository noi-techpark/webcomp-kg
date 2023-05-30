// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SparqlService} from '../../sparql.service';
import {Observable} from 'rxjs';
import {SelectResultSet} from '../../../model/sparql';


@Component({
  selector: 'kg-table',
  templateUrl: './kg-table.component.html',
  styleUrls: ['./kg-table.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgTableComponent implements OnInit {

  @Input() endpoint: string;

  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResultSet;

  finished = false;

  constructor(private sparqlService: SparqlService) {}

  ngOnInit(): void {

    this.sparqlService.endpoint = this.endpoint;

    const results: Observable<SelectResultSet> = this.sparqlService.select(this.query);
    results.subscribe(value => {
      this.finished = true;
      this.results = value;
    }, error => {
      this.finished = true;
      this.errorMessage = JSON.stringify(error);
    });

  }

}
