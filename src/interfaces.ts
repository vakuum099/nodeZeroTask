type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';
export type Resource = 'create' | 'read' | 'change' | 'delete';
export interface Services {
  create: Method;
  read: Method;
  change: Method;
  delete: Method;
}
