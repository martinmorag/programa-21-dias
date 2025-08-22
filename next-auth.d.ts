// import NextAuth, { DefaultSession } from 'next-auth';

// interface CustomUser extends DefaultUser {
//   id: string;
//   default_picture: string;
// }

// // Augment the Session interface to include your custom user type
// declare module 'next-auth' {
//   interface Session {
//     user: CustomUser & DefaultSession['usuario']; // Merge with default user properties
//   }

//   interface User extends CustomUser {} // Extend the User interface with custom properties
// }
// next-auth.d.ts
import 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the default NextAuth 'User' and 'Session' types to include custom properties.
declare module 'next-auth' {
  /**
   * The shape of the user object returned from the provider and saved to the session.
   */
  interface User {
    id: string;
    lastname?: string | null;
    rememberMe: boolean;
  }

  interface Session {
    user: {
      id: string;
      lastname?: string | null;
      rememberMe: boolean;
    } & DefaultSession["user"];
  }
}

// Extend the JWT type for storing custom data
declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and can be accessed from `session` callback and `getServerSession`.
   */
  interface JWT {
    id: string;
    lastname?: string | null;
    rememberMe: boolean;
  }
}