const TYPES = {
  Controller: Symbol('IController'),
  ProductController: Symbol('ProductController'),

  IProductService: Symbol('IProductService'),
  IBrandService: Symbol('IBrandService'),
  IActivityService: Symbol('IActivityService'),

  IProductRepository: Symbol('IProductRepository'),
  IBrandRepository: Symbol('IBrandRepository'),
};

export default TYPES;
