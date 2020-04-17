import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SelectResultSet, SolutionMapping, TypedLiteral} from '../model/sparql';

import WKT from 'ol/format/WKT';
import {Feature} from 'ol';
import {Observable} from 'rxjs';
import {Circle, Fill, Style} from 'ol/style';

import {colorFromString} from './color-util';
import {Geometry} from 'ol/geom';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }

  // tslint:disable-next-line:variable-name
  private _endpoint;

  constructor(private http: HttpClient) {
  }

  select(sparql: string): Observable<SelectResultSet> {
    const requestBody = 'query=' + encodeURIComponent(sparql) +
      '&Accept=' + encodeURIComponent('application/sparql-results+json');
    // console.log(requestBody);
    return this.http.post<SelectResultSet>(this._endpoint, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
    });
  }

  asFeatures(results: SelectResultSet): Feature<any>[] {
    const vars = results.head.vars;
    const solutionMappings = results.results.bindings;
    if (solutionMappings.length === 0) {
      return [];
    }

    const m0 = solutionMappings[0];
    let wktVar;
    for (const [varName, value] of Object.entries(m0)) {
      if ('datatype' in value && value.datatype === 'http://www.opengis.net/ont/geosparql#wktLiteral') {
        wktVar = varName;
        break;
      }
    }

    const labelVar = wktVar + 'Label';
    const colorVar = wktVar + 'Color';

    const wktFormat = new WKT();

    return solutionMappings
      .map((m: SolutionMapping) => {
        const wkt: string = m[wktVar].value;
        const feature = wktFormat.readFeature(wkt);
        if (m[colorVar]) {
          feature.setStyle(new Style({
            image: new Circle({
              radius: 4,
              fill: new Fill({color: colorFromString(m[colorVar].value)})
            })
          }));
        }

        if (m[labelVar]) {
          feature.set('label', m[labelVar].value);
        }

        return feature;
      });
  }

}
