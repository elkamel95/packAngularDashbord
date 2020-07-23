1) npm i dashbord-sf-generic
2) git remote https://github.com/elkamel95/packageAngularDashbord.git
3)copy all this file in your project in src folder. 
4) import the Layout Dashboard Module into AppModule like this:
```TypeScripte

    		import { NgModule } from '@angular/core';

		import { AppComponent } from './app.component';

		import { LayoutDashboardModule } from './lib/layout/layout-dashboard/layout-dashboard.module';

		    @NgModule({
		      declarations: [
			AppComponent,
		      ],
		      imports: [
			LayoutDashboardModule,
		      ],
		      providers: [],
		      bootstrap: [AppComponent]
		    })
		    export class AppModule { }	
    
5)  run server 
