export interface Activity {
  id?: string;
  resourceId?: string;
  resourceName: string;
  action: string;
  detail: string;
  createdAt: Date;
}

export interface ActivityCreation {
  userId: string; // userId will be replaced by id of user get from token
  resourceId?: string;
  resourceName: ActivityResource;
  action: ActivityAction;
  detail: string;
}

export enum ActivityResource {
  PRODUCT = 'PRODUCT',
  BRAND = 'BRAND',
}

export enum ActivityAction {
  CREATE = 'CREATE',
  GET_LIST = 'GET_LIST',
  GET_DETAILS = 'GET_DETAILS',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
