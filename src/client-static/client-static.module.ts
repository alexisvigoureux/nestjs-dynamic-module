import { Module } from '@nestjs/common';
import { ClientStaticService } from './client-static.service';

@Module({
  providers: [{
    provide: 'ClientOptions',
    useValue: {
      dbUrl: 'MY_STATIC_IP'
    }
  }, ClientStaticService],
  exports: [ClientStaticService]
})
export class ClientStaticModule {}