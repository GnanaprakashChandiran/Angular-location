import { Component, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PlacesService } from './services/places.service';
import { environment } from '../environments/environment';
@Component({
  selector: 'angular-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  @Input() locationData: ILocationData;
  @Input() config: ILocationData = {
    state: true,
    city: true
  };
  formData: Array<Object>;
  constructor(public placesService: PlacesService) {

    let path = this.placesService.apiList[0]['path'].replace('{{token}}', environment.battutaToken);
    if (!this.locationData) {
      this.locationData = {
        country: '',
        state: '',
        city: ''
      };
    }
    this.formData = [
      {
        key: 'country',
        placeholder: 'Country',
        next: 'state',
        prop: 'name',
        data: []
      },
      {
        key: 'state',
        placeholder: 'State',
        next: 'city',
        prop: 'region',
        data: []
      },
      {
        key: 'city',
        placeholder: 'City',
        prop: 'city',
        data: []
      }
    ];
    this.config.city = this.config.state === false ? false : this.config.city;
    for (var indexOfData in this.config) {
      if (!this.config[indexOfData]) {
        let indexele = this.formData.findIndex(temp => temp['key'] === indexOfData);
        this.formData.splice(indexele, 1);
      }
    }

    //battuta.medunes.net api
    this.placesService.getDataFromCloud(path).subscribe(data => {
      this.formData[0]['data'] = (this.formData[0]['data'] as Array<Object>).concat(data);
    });
    for (let formval of this.formData) {
      formval[formval['key']] = new FormControl();
      formval['filterData' + formval['key']] = formval[formval['key']].valueChanges
        .pipe(
          startWith(''),
          map(value => value ? this._filterStates(value, formval) : formval['data'].slice())
        );
    }
  }

  private _filterStates(value, formData?): any[] {
    const filterValue = value.toLowerCase();
    return formData['data'].filter(state => state[formData['prop']].toLowerCase().indexOf(filterValue) === 0);
  }


  // battuta.medunes.net api
  getData(currObj) {
    if (currObj.next) {
      var data = this.placesService.apiList.find(tempdata => tempdata['key'] === currObj.next);
      var code = ((this.formData[0]['data'] as Array<object>).find(tempData1 => tempData1['name'] === this.formData[0]['country'].value))['code'];
      if (data) {
        var apipath = (data['path'] as String).replace('{{country_code}}', code).replace('{{token}}', environment.battutaToken);
        if (currObj['next'] === 'city') {
          apipath = apipath.replace('{{city}}', this.formData[1]['state'].value);
        }
        let formData = this.formData.find(tempdata => tempdata['key'] === currObj.next);
        if (formData) {
          this.placesService.getDataFromCloud(apipath).subscribe(data => {
            formData['data'] = data;
            this.resetField(currObj.next);
          });
        }
      }
    }
    console.log('location data', this.locationData);
  }
  resetField(nextKey) {
    let formData = this.formData.find(tempdata => tempdata['key'] === nextKey);
    (formData[nextKey] as FormControl).reset();
    if (formData.hasOwnProperty('next')) {
      this.resetField(formData['next']);
    }
  }
}
interface ILocationData {
  country?: any,
  state: any,
  city: any
}
