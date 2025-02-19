import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import axios from 'axios';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const { data } = await axios.post(
            'http://localhost:5000/auth/signin',
            { email, password }, 
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (!data || !data.user) {
            console.log('Authentication failed: Invalid response');
            return null;
          }

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token, 
          };
        } catch (error) {
          console.error('Error during authentication:', error?.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
});
