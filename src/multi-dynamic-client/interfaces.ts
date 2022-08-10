import { FactoryProvider, Type } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'

export type DynamicModuleOptions = {
  name?: string
  dbUrl: string
}

export interface DynamicClientOptionsFactory {
  createDynamicClientOptions():
    | Promise<DynamicModuleOptions>
    | DynamicModuleOptions
}

export interface DynamicClientModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useExisting?: Type<DynamicClientOptionsFactory>
  useClass?: Type<DynamicClientOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<DynamicModuleOptions> | DynamicModuleOptions
  inject?: FactoryProvider['inject']
}