import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Http, HttpModule, JsonpModule  } from '@angular/http';

// services
import { PlacesService } from './services/places.service';
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpModule,JsonpModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule],
  providers: [HttpClient, PlacesService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
