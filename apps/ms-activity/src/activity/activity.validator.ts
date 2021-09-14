import 'joi-extract-type';
import Joi from '@hapi/joi';
import { ValidatedRequestSchema } from 'express-joi-validation';
import { ContainerTypes } from '../common/containerType';

export const activityCreationValidator = Joi.object({
  userId: Joi.string().required(),
  resourceId: Joi.string().optional(),
  resourceName: Joi.string().required(),
  action: Joi.string().required(),
  detail: Joi.string().required(),
});

export interface ActivityCreationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof activityCreationValidator>;
}
