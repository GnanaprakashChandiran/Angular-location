import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule } from '@angular/material';
import { LocationComponent } from './location.component';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Http, HttpModule, JsonpModule  } from '@angular/http';

// services
import { PlacesService } from './services/places.service';
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpModule,JsonpModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule],
  providers: [HttpClient, PlacesService],
  declarations: [LocationComponent],
  bootstrap: [LocationComponent]
})
export class LocationModule { }
