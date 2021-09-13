import 'joi-extract-type';
import Joi from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const activityCreationValidator = Joi.object({
  resourceId: Joi.string().optional(),
  resourceName: Joi.string().required(),
  action: Joi.string().required(),
  detail: Joi.string().required(),
});

export interface ActivityCreationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof activityCreationValidator>;
}
