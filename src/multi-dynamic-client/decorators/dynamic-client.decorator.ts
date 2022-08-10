import { Inject } from '@nestjs/common'
import { DYNAMIC_MODULE_OPTIONS } from '../multi-dynamic-client.constant'

export const InjectClient = (name?: string): ParameterDecorator =>
  Inject(`client_${name}` || DYNAMIC_MODULE_OPTIONS)