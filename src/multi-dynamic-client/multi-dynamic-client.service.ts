import { DynamicModuleOptions } from './interfaces';

export class MultiDynamicClientService {
  protected dbUrl: string;

  constructor(public options: DynamicModuleOptions) {
     console.log(`Init multi dynamic client service with url: ${options?.dbUrl}`);
    this.dbUrl = options?.dbUrl;
  }

  getDb() {
    return this.dbUrl;
  }
}


