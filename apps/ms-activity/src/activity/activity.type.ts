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
  resourceName: string;
  action: string;
  detail: string;
}
