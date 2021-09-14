export interface Activity {
  id?: string;
  resourceId?: string;
  resourceName: string;
  action: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityCreation {
  resourceId?: string;
  resourceName: ACTIVITY_RESOURCES;
  action: ACTIVITY_ACTION;
  detail: string;
}

export enum ACTIVITY_RESOURCES {
  PRODUCT = 'PRODUCT',
  BRAND = 'BRAND',
}

export enum ACTIVITY_ACTION {
  CREATE = 'CREATE',
  GET_LIST = 'GET_LIST',
  GET_DETAILS = 'GET_DETAILS',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
