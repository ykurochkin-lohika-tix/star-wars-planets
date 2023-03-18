import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { StarWarPlanetsComponent } from './shell/star-war-planets/star-war-planets.component';
import { StarWarPlanetsSelectComponent } from './shell/star-war-planets/star-war-planets-select/star-war-planets-select.component';
import { StarWarPlanetsTableComponent } from './shell/star-war-planets/star-war-planets-table/star-war-planets-table.component';
import { StarWarPlanetsDialogCharactersComponent } from './shell/star-war-planets/star-war-planets-dialog-characters/star-war-planets-dialog-characters.component';

@NgModule({
  declarations: [
    AppComponent,
    StarWarPlanetsComponent,
    StarWarPlanetsSelectComponent,
    StarWarPlanetsTableComponent,
    StarWarPlanetsDialogCharactersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
