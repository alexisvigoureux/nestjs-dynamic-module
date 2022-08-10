import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicClientModule } from './dynamic-client/dynamic-client.module';
import { ClientStaticModule } from './client-static/client-static.module';
import { MultiDynamicClientModule } from './multi-dynamic-client/multi-dynamic-client.module';

@Module({
  imports: [
    // Static module
    ClientStaticModule, 
    
    // Dynamic module
    // DynamicClientModule.register({dbUrl: 'MY_IP1'}) 

    // Dynamic module & async provider
    DynamicClientModule.registerAsync({ 
       useFactory: async () => ({        
       dbUrl: 'MY_IP0'
      }),
    }),

    // Multi dynamic module
    MultiDynamicClientModule.registerAsync({
      name: 'dynamicModule1',
      useFactory: async () => ({        
        dbUrl: 'MY_IP1'
      }),
    }),
    MultiDynamicClientModule.registerAsync({
      name: 'dynamicModule2',
      useFactory: async () => ({        
        dbUrl: 'MY_IP2'
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
