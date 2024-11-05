import { Email } from '@/misc/email-schema.mjs';
import { Schema } from 'effect';

export const SignUp = Schema.Struct({
  email: Email,
  password: Schema.String.pipe(
    Schema.annotations({
      title: 'Password',
      description: 'A password',
      default: 'p@ss0wrd',
    }),
  ),
  confirmPassword: Schema.String.pipe(
    Schema.annotations({
      title: 'Password',
      description: 'A password',
      default: 'p@ss0wrd',
    }),
  ),
}).pipe(
  Schema.filter((input) => {
    if (input.password !== input.confirmPassword) {
      return {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      };
    }
  }),
  Schema.annotations({
    title: 'Sign Up',
    description: 'Sign up for an account',
    jsonSchema: {
      required: ['email', 'password', 'confirmPassword'],
    },
  }),
);

export type SignUp = typeof SignUp.Type;
