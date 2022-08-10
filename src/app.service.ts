import { Injectable } from '@nestjs/common';
import { MultiDynamicClientService } from './multi-dynamic-client/multi-dynamic-client.service';
import { InjectClient } from './multi-dynamic-client/decorators/dynamic-client.decorator';
import { DynamicClientService } from './dynamic-client/dynamic-client.service';
import { ClientStaticService } from './client-static/client-static.service';

@Injectable()
export class AppService {
  constructor(
    private clientStatic: ClientStaticService,
    private client0: DynamicClientService,
    @InjectClient('dynamicModule1')
    private client1: MultiDynamicClientService,
    @InjectClient('dynamicModule2')
    private client2: MultiDynamicClientService,
  )
  {
    console.log(`App service static client: ${clientStatic.getDb()}`);
    console.log(`App service dynamic client: ${client0.getDb()}`);
    console.log(`App service multi dynamic client 1: ${client1.getDb()}`);
    console.log(`App service multi dynamic client 2: ${client2.getDb()}`);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
