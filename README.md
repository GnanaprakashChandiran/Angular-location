# AngularLocation

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Usage

npm install angular-location --save

## In app.module.ts, make the following additions

import { LocationModule } from 'angular-location';

@NgModule({
  imports: [
    LocationModule
  ]
})
export class AppModule { }

## component file use like below

<angular-location [locationData]="locationData" [config]="locationConfig"></angular-location>

locationData = {
  country: any,
  state: any,
  city: any
}

If you have battutta token, you can send the token as input to angular-location.

