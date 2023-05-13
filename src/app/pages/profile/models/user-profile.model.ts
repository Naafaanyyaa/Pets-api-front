import {UserSubscriptionModel} from "./user-subscription.model";

export interface UserProfileModel{
  userName: string;
  email : string;
  phone: string | null;
  isBanned: boolean;
  firstName : string;
  lastName : string;
  subscription : UserSubscriptionModel | null;
}
