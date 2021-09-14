import 'joi-extract-type';
import Joi from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const productGetListValidator = Joi.object({
  userId: Joi.string().optional(), // userId will be replaced by id of user get from token
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

export const productCreationQueryValidator = Joi.object({
  userId: Joi.string().required(), // userId will be replaced by id of user get from token
});

export interface ProductCreationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof productCreationBodyValidator>;
  [ContainerTypes.Query]: Joi.extractType<typeof productCreationQueryValidator>;
}

export const productGetDetailQueryValidator = productCreationQueryValidator;

export interface ProductGetDetailRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<
    typeof productGetDetailQueryValidator
  >;
}
