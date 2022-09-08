import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MapsComponent } from './elements/maps/maps.component';
import { MapComponent } from './elements/map/map.component';
import { CountdownComponent } from './elements/countdown/countdown.component';
import { FooterComponent } from './elements/footer/footer.component';
import { CraftingComponent } from './elements/crafting/crafting.component';
import { CraftingItemsComponent } from './elements/crafting-items/crafting-items.component';
import { ServersComponent } from './elements/servers/servers.component';


@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = []): any {
        return value === null || value === undefined ? [] : Object.keys(value)//.map(key => value[key]);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    MapComponent,
    CountdownComponent,
    FooterComponent,
    CraftingComponent,
    CraftingItemsComponent,
    ServersComponent,
      KeysPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
