import { Injectable, Inject } from '@nestjs/common';
import { DynamicModuleOptions } from './interfaces';
import { DYNAMIC_MODULE_OPTIONS } from './dynamic-client.constant';

@Injectable()
export class DynamicClientService {
  private dbUrl: string
  
  constructor(@Inject(DYNAMIC_MODULE_OPTIONS) private options: DynamicModuleOptions) {
    console.log(`Init dynamic client service with url: ${options.dbUrl}`);
    this.dbUrl = options.dbUrl
  }

  getDb() {
    return this.dbUrl
  }
}
