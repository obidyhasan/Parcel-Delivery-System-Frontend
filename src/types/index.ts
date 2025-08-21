export type { Role } from "./auth.type";

type ErrorSource = {
  path: string;
  message: string;
};

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSource?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
