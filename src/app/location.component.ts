import { Component, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PlacesService } from './services/places.service';
import { environment } from '../environments/environment';
@Component({
  selector: 'angular-location',
  template : `
  <div *ngFor="let curdata of formData">
	<mat-form-field>
<input matInput [(ngModel)]="locationData[curdata.key]" placeholder="{{curdata.placeholder}}" [matAutocomplete]="auto" [formControl]="curdata[curdata.key]">
		<mat-autocomplete #auto="matAutocomplete" (optionSelected)="getData(curdata)">
			<mat-option *ngFor="let options of curdata['filterData'+curdata['key']] | async" [value]="options[curdata.prop]" >
				<span>{{options[curdata.prop]}}</span>
			</mat-option>
		</mat-autocomplete>
	</mat-form-field>
</div>
  `
  // templateUrl: './location.component.html',
  // styleUrls: ['./location.component.css']
})
export class LocationComponent {
  @Input() battutaToken :  string;
  @Input() locationData: ILocationData;
  @Input() config: ILocationData = {
    state: true,
    city: true
  };
  defaultApi = '00000000000000000000000000000000';
  formData: Array<Object>;
  constructor(public placesService: PlacesService) { }
  ngOnInit() {
    if(!this.battutaToken) {
      this.battutaToken = environment.battutaToken;
    }
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

    if (localStorage.getItem('locationcountry')) {
      var countryList = localStorage.getItem('locationcountry') as string;
      this.formData[0]['data'] = (this.formData[0]['data'] as Array<Object>).concat(JSON.parse(countryList));
    } else {
      this.getData(this.formData[0], 'country');
    }
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
  getData(currObj, type?) {
    if(type === 'country') {
      var path = this.placesService.getApiList()[0]['path'].replace('{{token}}', this.battutaToken);
      this.placesService.getDataFromCloud(path).subscribe(data => {
        this.formData[0]['data'] = (this.formData[0]['data'] as Array<Object>).concat(data);
        localStorage.setItem('locationcountry', JSON.stringify(data));
      }, err => {
        this.battutaToken = this.defaultApi;
        this.getData(currObj, 'country');
      });
      return;
    }
    if (currObj.next) {
      var data = this.placesService.apiList.find(tempdata => tempdata['key'] === currObj.next);
      var coutrydata = (this.formData[0]['data'] as Array<object>).find(tempData1 => tempData1['name'] === this.formData[0]['country'].value);
      var code = coutrydata ? coutrydata['code'] : '';
      if (data) {
        var apipath = (data['path'] as String).replace('{{country_code}}', code).replace('{{token}}', this.battutaToken);
        if (currObj['next'] === 'city') {
          apipath = apipath.replace('{{city}}', this.formData[1]['state'].value);
        }
        let formData = this.formData.find(tempdata => tempdata['key'] === currObj.next);
        if (formData) {
          this.placesService.getDataFromCloud(apipath).subscribe(data => {
            if (formData) {
              formData['data'] = data;
            }
            this.resetField(currObj.next);
          }, err => {
            this.battutaToken = this.defaultApi;
            this.getData(currObj);
          });
        }
      }
    }
  }
  resetField(nextKey) {
    let formData = this.formData.find(tempdata => tempdata['key'] === nextKey);
    if (formData) {
      (formData[nextKey] as FormControl).reset();
      if (formData.hasOwnProperty('next')) {
        this.resetField(formData['next']);
      }
    }

  }
}
export interface ILocationData {
  country?: any,
  state: any,
  city: any
}
