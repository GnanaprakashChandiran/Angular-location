import { Injectable } from '@angular/core';
import {  Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlacesService {  
  apiList: Array<any> = [
    {
      key: 'country',
      path: 'https://battuta.medunes.net/api/country/all/?key={{token}}'
      //path: 'https://api.geonames.org/countryInfo?username=prakash_geo'
    },
    {
      key: 'state',
      //path: 'http://api.geonames.org/children?geonameId={{geonameId}}&username=prakash_geo'
      path: 'https://battuta.medunes.net/api/region/{{country_code}}/all/?key={{token}}'
    },
    {
      key: 'city',
      path: 'https://battuta.medunes.net/api/city/{{country_code}}/search/?region={{city}}&key={{token}}'
    }
  ];
  constructor(private jsonp: Jsonp) {

  }


  getDataFromCloud(apipath : string) : Observable<any> {
    let apiURL = `${apipath}&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL)
      .map(res => {
        return res.json()
      });
  }
  getApiList() : Array<any> {
    return this.apiList;
  }
}


