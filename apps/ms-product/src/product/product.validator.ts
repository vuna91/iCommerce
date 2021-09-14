import 'joi-extract-type';
import Joi from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const productGetListValidator = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  brand: Joi.string().optional(),
  color: Joi.string().optional(),
  sortBy: Joi.string().optional(),
});

export interface ProductGetListRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof productGetListValidator>;
}

export const productCreationBodyValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  brand: Joi.string().required(),
  color: Joi.string().required(),
});

export interface ProductCreationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof productCreationBodyValidator>;
}
