import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {useGeographic} from 'ol/proj';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import FullScreen from 'ol/control/FullScreen';
import MousePosition from 'ol/control/MousePosition';
import OverviewMap from 'ol/control/OverviewMap';
import Zoom from 'ol/control/Zoom';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import {defaults as defaultInteractions} from 'ol/interaction';

import Point from 'ol/geom/Point';
import {SparqlService} from '../../sparql.service';
import {SelectResultSet} from '../../../model/sparql';
import MapBrowserEvent from 'ol/MapBrowserEvent';


@Component({
  selector: 'kg-map',
  templateUrl: './kg-map.component.html',
  styleUrls: ['./kg-map.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgMapComponent implements OnInit, AfterViewInit {

  private vectorLayer: VectorLayer;
  private map: Map;
  @ViewChild('map') mapChild: ElementRef;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('popupcloser') closer: ElementRef;
  @ViewChild('popupcontent') content: ElementRef;

  constructor(private sparqlService: SparqlService) {

  }

  @Input() endpoint: string;

  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResultSet;

  finished = false;

  private createMap() {

    useGeographic();

    // bolzano
    const place = [11.33982, 46.49067];

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      }),
      style: new Style({
        image: new Circle({
          radius: 4,
          fill: new Fill({color: 'red'})
        })
      })
    });

    const osmLayer = new TileLayer({
      source: new OSM()
    });

    const container = this.popup.nativeElement;
    const content = this.content.nativeElement;
    const closer = this.closer.nativeElement;

    /**
     * Create an overlay to anchor the popup to the map.
     */
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    closer.onclick = () => {
      overlay.setPosition(undefined);
      // closer.blur();
      return false;
    };

    this.map = new Map({
      interactions: defaultInteractions({
        /* onFocusOnly caused trouble. It has to be disabled */
        // onFocusOnly: true
      }),
      target: this.mapChild.nativeElement,
      view: new View({
        center: place,
        zoom: 8
      }),
      layers: [
        osmLayer,
        this.vectorLayer
      ],
      overlays: [
        overlay
      ],
      controls: [
        new OverviewMap(),
        new Zoom(),
        new MousePosition(),
        new FullScreen()
      ]
    });

    this.map.on('singleclick', (evt: MapBrowserEvent) => {
      let coordinate = evt.coordinate;

      const feature = this.map.getFeaturesAtPixel(evt.pixel)[0];
      if (feature) {
        coordinate = (feature.getGeometry() as Point).getCoordinates();
        content.innerHTML = feature.get('label');
        overlay.setPosition(coordinate);
      }
    });

    this.map.on('pointermove', (event: MapBrowserEvent) => {
      if (this.map.hasFeatureAtPixel(event.pixel)) {
        this.map.getViewport().style.cursor = 'pointer';
      } else {
        this.map.getViewport().style.cursor = 'inherit';
      }
    });

  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.createMap();

    this.sparqlService.endpoint = this.endpoint;
    this.sparqlService.select(this.query)
      .subscribe(value => {
        this.finished = true;
        this.results = value;
        const features = this.sparqlService.asFeatures(value);
        // console.log(features);
        this.vectorLayer.getSource().addFeatures(features);
      }, error => {
        this.finished = true;
        this.errorMessage = JSON.stringify(error);
      });
  }


}
