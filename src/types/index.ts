import type { ComponentType } from "react";

export type { Role } from "./auth.type";

export type TRole = "ADMIN" | "SENDER" | "RECEIVER";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

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
