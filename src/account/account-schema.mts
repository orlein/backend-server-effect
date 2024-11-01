import {
  CustomDateTimeInsert,
  CustomDateTimeUpdate,
} from '@/misc/date-schema.mjs';
import { Email } from '@/misc/email-schema.mjs';
import { Model } from '@effect/sql';
import { Context, Schema } from 'effect';

export const AccountId = Schema.String.pipe(Schema.brand('AccountId'));

export type AccountId = typeof AccountId.Type;

export class Account extends Model.Class<Account>('Account')({
  id: Model.Generated(AccountId),
  email: Email,
  passwordHash: Model.Sensitive(Schema.String),
  passwordSalt: Model.Sensitive(Schema.String),
  profileImageUrl: Schema.UndefinedOr(Schema.String),
  mainLanguage: Schema.UndefinedOr(Schema.String),
  nationality: Schema.UndefinedOr(Schema.String),
  bio: Schema.UndefinedOr(Schema.String),
  externalUrls: Schema.UndefinedOr(Schema.Array(Schema.String)),
  isEmailVerified: Schema.Boolean,
  isPrivate: Schema.Boolean,
  role: Schema.Literal('admin', 'user').annotations({
    default: 'user',
  }),
  createdAt: CustomDateTimeInsert,
  updatedAt: CustomDateTimeUpdate,
}) {}

export class CurrentAccount extends Context.Tag('CurrentAccount')<
  CurrentAccount,
  Account
>() {}
