export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string; // Optional for OAuth
    role?: string;
    provider?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  