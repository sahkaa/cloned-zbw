export interface User {
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  status?: 'online' | 'offline';
  badgeInbox?: number;
}
