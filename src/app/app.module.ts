import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AaOnboardingLayoutModule } from './aa-onboarding-layout/aa-onboarding-layout.module';
import { ConfigService } from 'src/app/services/config/config-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthInterceptor } from './services/helpers/basic-auth.interceptor';
import { UserLoginService } from './services/user-login/user-login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AaOnboardingLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserLoginService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: BasicAuthInterceptor, 
      multi: true 
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          //Make sure to return a promise!
          return configService.loadAppConfig();
        };
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
