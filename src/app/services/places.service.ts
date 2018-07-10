import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacesService {  
  apiList: Array<Object> = [
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
  constructor(public httpclient: HttpClient,
    private jsonp: Jsonp) {

  }


  getDataFromCloud(apipath) {
    let apiURL = `${apipath}&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL)
      .map(res => {
        return res.json()
      });
  }
}


