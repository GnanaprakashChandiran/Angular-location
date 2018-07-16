# AngularLocation

This module supports angular 5+ versions

## Features

- Autocomplete
- Filter region and city based on country.
- Default country, region and city will be displayed. In this module, provide configure option to display(country only, country and state only, all) 

## Demo Output

<div align="center">
    <img src="src/assets/test-screenshot1.png"</img> 
</div>


## Usage
```
npm install angular5-location --save
```
## In app.module.ts, make the following additions
```
import { LocationModule } from 'angular5-location';

@NgModule({
  imports: [
    LocationModule
  ]
})
export class AppModule { }
```
## component file use like below
```
<angular5-location [locationData]="locationData" [config]="locationConfig"></angular5-location>
```
```
locationData = {
  country: any,
  state: any,
  city: any
}
```
If you have battutta token, you can send the token as input to angular5-location.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
