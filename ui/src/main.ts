import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';
import { environment } from 'environments/environment';
import { environmentLoader as environmentLoaderPromise } from 'environments/environmentLoader';

environmentLoaderPromise.then(env => {
  if (env.production) {
    enableProdMode();
  }

  environment.serverPath = env.serverPath;
  environment.apiPath = env.apiPath;
  environment.production = env.production;

  platformBrowserDynamic().bootstrapModule(AppModule);
});
