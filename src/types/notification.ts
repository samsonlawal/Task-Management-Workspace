import { IUserSummary } from "./user";

export interface INotificationWorkspace {
  _id: string;
  name: string;
}

export interface INotification {
  _id: string;
  workspace?: INotificationWorkspace;
  type: number;
  isRead: boolean;
  triggeredBy?: IUserSummary;
  createdAt: string;
  message: string;
}
