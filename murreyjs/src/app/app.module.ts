import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CustomSidebarComponent } from './components/custom-sidebar/custom-sidebar.component';
import { SidebarSelectionComponent } from './components/custom-sidebar/sidebar-selection/sidebar-selection.component';
import { StockVizPageComponent } from './components/stock-viz-page/stock-viz-page.component';
import { AudioVizPageComponent } from './components/audio-viz-page/audio-viz-page.component';
import { ArtworkPageComponent } from './components/artwork-page/artwork-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomSidebarComponent,
    SidebarSelectionComponent,
    StockVizPageComponent,
    AudioVizPageComponent,
    ArtworkPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
