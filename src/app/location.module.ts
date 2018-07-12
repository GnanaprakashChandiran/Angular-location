import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule } from '@angular/material';
import { LocationComponent } from './location.component';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import {  HttpModule, JsonpModule  } from '@angular/http';

// services
import { PlacesService } from './services/places.service';
@NgModule({
  imports: [/*BrowserModule,*/ BrowserAnimationsModule, CommonModule, HttpClientModule, HttpModule,JsonpModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule],
  providers: [HttpClient, PlacesService],
  declarations: [LocationComponent],
  exports: [
    LocationComponent
  ],
  bootstrap: [LocationComponent]
})
export class LocationModule { }
