import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetStationsService } from 'src/app/services/stations/get-stations.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  public form: FormGroup

  public city: AbstractControl

  public sub = false

  loading = false
  displayDisplayComp = false
  dataFound = false
  stations: any

  constructor(
    private formBuilder: FormBuilder,
    public apiAqi: GetStationsService
  ) {
    this.form = this.formBuilder.group({
      city: ['Bogota', Validators.required]
    })
    this.city = this.form.controls['city']
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }

  validate() {
    this.sub = true
    if (this.form.invalid) {
      console.log('invalid')
      return
    }
    this.searchCity()
    this.sub = false
  }

  validateEnter(event: any) {
    if (event.keyCode == 13) {
      this.validate()
    }
  }

  async searchCity() {
    this.loading = true
    this.displayDisplayComp = false
    const wantedCity = this.form.controls['city'].value.toLowerCase()

    try {
      this.stations = await new Promise((resolve) => {
        this.apiAqi.getStationsByCity(wantedCity).subscribe((res: any) => {

          this.displayDisplayComp = true
          resolve(res.data)
        })
      })
    } catch (error) {
      console.log('Error al obtener estaciones.', error)
    }
    if (this.stations.length) {
      this.dataFound = true
    }
    else {
      this.dataFound = false
    }
    this.loading = false
  }
}
