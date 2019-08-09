import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutesState } from './core/routes/routes.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LocalStorageModule.withConfig({
      prefix: 'bus-sched',
      storageType: 'localStorage'
    }),
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      RoutesState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
