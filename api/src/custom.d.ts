export type User = {
  email: string;
  name: string;
  roleId: number;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
