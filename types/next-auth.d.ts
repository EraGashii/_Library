import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // 👈 ADD THIS
    };
  }

  interface User {
    role?: string; // 👈 ADD THIS TOO
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
