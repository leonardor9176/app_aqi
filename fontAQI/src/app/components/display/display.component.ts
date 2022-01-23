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

  // dataReceived = false
  // stations : any[]= []

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
        break;
      case ((this.aqi > 50) && (this.aqi <= 100)):
        this.bgColor = '#ffde33'
        this.em = 'em-confused'
        break;
      case ((this.aqi > 100) && (this.aqi <= 150)):
        this.bgColor = '#ff9933'
        this.em = 'em-sneezing_face'
        break;
      case ((this.aqi > 150) && (this.aqi <= 200)):
        this.bgColor = '#c03'
        this.em = 'em-fearful'
        break;
      case ((this.aqi > 200) && (this.aqi <= 300)):
        this.bgColor = '#609'
        this.em = 'em-scream'
        break;
      case (this.aqi > 300):
        this.bgColor = '#7e0023'
        this.em = 'em-skull_and_crossbones'
        break;
      default:
        this.bgColor = '#ffffff'
        this.em = 'em-grey_question'
        break
    }
  }
}
