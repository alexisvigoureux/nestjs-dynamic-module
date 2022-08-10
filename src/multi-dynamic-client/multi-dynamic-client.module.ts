import { DynamicModule, ForwardReference, Module, Provider, Type } from '@nestjs/common';
import { DYNAMIC_MODULE_OPTIONS } from './multi-dynamic-client.constant';
import { MultiDynamicClientService } from './multi-dynamic-client.service';
import {
  DynamicClientModuleAsyncOptions,
  DynamicClientOptionsFactory,
  DynamicModuleOptions,
} from './interfaces';

@Module({
  providers: [MultiDynamicClientService],
  exports: [MultiDynamicClientService],
})
export class MultiDynamicClientModule {
  static registerAsync(
    ...options: DynamicClientModuleAsyncOptions[]
  ): DynamicModule {
    const optionsArr = [...options]
    const asyncDynamicOptionsProviders = options
      .map((clientOptions) => this.createAsyncProviders(clientOptions))
      .reduce((a, b) => a.concat(b), [])
    const dynamicProviders = this.createClientProviders(optionsArr)
    const imports = this.getUniqImports(optionsArr)

    return {
      module: MultiDynamicClientModule,
      imports: imports,
      providers: [...asyncDynamicOptionsProviders, ...dynamicProviders],
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
        provide: options.name ? `options_${options.name}` : DYNAMIC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass ||
        options.useExisting) as Type<DynamicClientOptionsFactory>,
    ];
    return {
      provide: options.name ? `options_${options.name}` : DYNAMIC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: DynamicClientOptionsFactory) =>
        await optionsFactory.createDynamicClientOptions(),
      inject,
    };
  }

  private static createClientProviders(
    options: DynamicClientModuleAsyncOptions[]
  ): Provider[] {
    return options.map((option) => ({
      provide: `client_${option.name}`,
      useFactory: (o: DynamicModuleOptions) => {
        const name = o.name || option.name
        return new MultiDynamicClientService({...o, name})
      },
      inject: [`options_${option.name}`],
    }))
  }

  private static getUniqImports(
    options: DynamicClientModuleAsyncOptions[]
  ): Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  > {
    return (
      options
        .map((option) => option.imports || [])
        .reduce((acc, i) => acc.concat(i || []), [])
        .filter((v, i, a) => a.indexOf(v) === i) || []
    )
  }
}
