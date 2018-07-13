import { Component } from '@angular/core';

@Component({
    selector : 'location-app',
    template : '<angular-location [locationData]="locationData" [config]="locationConfig"></angular-location>'
})

export class ExampleComponent {
    locationData : any = {};
    locationConfig = {
        state : true,
        city : true
    }
    constructor() {}
}