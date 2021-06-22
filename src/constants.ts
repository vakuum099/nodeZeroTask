export const response404 =
  '<!DOCTYPE html><head><title>Error 404</title></head><body style="height:100vh;"><h2 style="margin-top: 30vh; text-align: center;">Error 404. File don\'t exist.</h2></body>';
  
export enum Methods {
  create = 'POST',
  read = 'GET',
  change = 'PUT',
  delete = 'DELETE',
}

export enum Resource {
  create = 'create',
  read = 'read',
  change = 'change',
  delete = 'delete',
}