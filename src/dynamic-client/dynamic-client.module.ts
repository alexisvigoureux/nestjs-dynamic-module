import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { DYNAMIC_MODULE_OPTIONS } from './dynamic-client.constant';
import { DynamicClientService } from './dynamic-client.service';
import {
  DynamicClientModuleAsyncOptions,
  DynamicClientOptionsFactory,
  DynamicModuleOptions,
} from './interfaces';

@Module({
  providers: [DynamicClientService],
  exports: [DynamicClientService],
})
export class DynamicClientModule {
  static register(options: DynamicModuleOptions): DynamicModule {
    return {
      module: DynamicClientModule,
      providers: [
        {
          provide: DYNAMIC_MODULE_OPTIONS,
          useValue: options,
        },
        DynamicClientService,
      ],
      exports: [DynamicClientService],
    };
  }

  static registerAsync(
    options: DynamicClientModuleAsyncOptions,
  ): DynamicModule {
    const dynamicProviders = this.createAsyncProviders(options);
    return {
      module: DynamicClientModule,
      imports: options.imports || [],
      providers: [...dynamicProviders],
      exports: dynamicProviders,
    };
  }

  private static createAsyncProviders(
    options: DynamicClientModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<DynamicClientOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: DynamicClientModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: DYNAMIC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass ||
        options.useExisting) as Type<DynamicClientOptionsFactory>,
    ];
    return {
      provide: DYNAMIC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: DynamicClientOptionsFactory) =>
        await optionsFactory.createDynamicClientOptions(),
      inject,
    };
  }
}
