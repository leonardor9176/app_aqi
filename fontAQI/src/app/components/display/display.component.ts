import { Component, OnInit, Input } from '@angular/core';
import { GetStationsService } from 'src/app/services/stations/get-stations.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input() stations: any = [];
  station: any = {}
  aqi: Number = 0
  bgColor = ''
  em = ''
  label = ''
  categories = {
    good: 'Bueno',
    moderate: 'Moderado',
    unhSensitive: 'Malsano para Grupos Sensibles',
    unhealthy: 'Malsano',
    veryunhealthy: 'Muy Poco Saludable',
    hazardous: 'Peligroso',
    unknown: 'Desconocido'
  }

  constructor(
    public apiAqi: GetStationsService
  ) { }

  ngOnInit(): void {
  }

  stationSelected(event: any) {
    const uid = event.target.value
    this.station = this.stations.find((station: any) => station.uid == uid)
    this.aqi = this.station.aqi
    switch (true) {
      case (this.aqi <= 50):
        this.bgColor = '#096'
        this.em = 'em-smiley'
        this.label = this.categories.good
        break;
      case ((this.aqi > 50) && (this.aqi <= 100)):
        this.bgColor = '#ffde33'
        this.em = 'em-confused'
        this.label = this.categories.moderate
        break;
      case ((this.aqi > 100) && (this.aqi <= 150)):
        this.bgColor = '#ff9933'
        this.em = 'em-sneezing_face'
        this.label = this.categories.unhSensitive
        break;
      case ((this.aqi > 150) && (this.aqi <= 200)):
        this.bgColor = '#c03'
        this.em = 'em-fearful'
        this.label = this.categories.unhealthy
        break;
      case ((this.aqi > 200) && (this.aqi <= 300)):
        this.bgColor = '#609'
        this.em = 'em-scream'
        this.label = this.categories.veryunhealthy
        break;
      case (this.aqi > 300):
        this.bgColor = '#7e0023'
        this.em = 'em-skull_and_crossbones'
        this.label = this.categories.hazardous
        break;
      default:
        this.bgColor = '#ffffff'
        this.em = 'em-grey_question'
        this.label = this.categories.unknown
        break
    }
  }
}
