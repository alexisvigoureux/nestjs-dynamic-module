import { Injectable, Inject } from '@nestjs/common';
import { StaticModuleOptions } from './interfaces';

@Injectable()
export class ClientStaticService {
  private dbUrl: string

  constructor(@Inject('ClientOptions') private options: StaticModuleOptions) {
    console.log(`Init static client service with url: ${options.dbUrl}`);
    this.dbUrl = options.dbUrl
  }

  getDb() {
    return this.dbUrl
  }
}
