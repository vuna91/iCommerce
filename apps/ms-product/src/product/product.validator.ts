import 'joi-extract-type';
import Joi from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const retrieveProductValidator = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  brand: Joi.string().optional(),
  color: Joi.string().optional(),
  sortBy: Joi.string().optional(),
});

export interface RetrieveProductRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof retrieveProductValidator>;
}
