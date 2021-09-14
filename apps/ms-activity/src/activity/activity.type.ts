export interface Activity {
  id?: string;
  userId: string;
  resourceId?: string;
  resourceName: string;
  action: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityCreation {
  userId: string;
  resourceId?: string;
  resourceName: string;
  action: string;
  detail: string;
}
