# <img src=".github/assets/logo-nest.svg" alt="Logo NestJS" width="25"> NestJS - Class Validator

<img align="right" src=".github/assets/sign-error-icon.png" alt="Error" width="125"/>

<p align="justify">
  Boilerplate NestJS for use class-validator.

Allows use of decorator and non-decorator based validation. Internally uses <a href="https://github.com/validatorjs/validator.js">validator.js</a> to perform validation. <a href="https://github.com/typestack/class-validator">Class-validator</a> works on both browser and node.js platforms.

</p>

<hr/>

## Models

```ts
user: {
  id: string;
  name: string;
  email: string;
  password: string;
  code_active: string;
  account_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

## Use cases

### Users:

Create:

RF

- should be able create a new user;

RN

- should not be able create a new user if e-mail already exists;
- account_active should must default false;
- code_active should is form 6 digits numerals;
- password must be encrypted

Update:

RF

- should be able a update user;

RN

- should not be able update user not exists;
- should not be able update user if e-mail already exists;
- should not be able update user if account_active equals false;

Delete:

RF

- should be able delete a user;

RN

- should not be able delete a user not exists;

Active account:

RF

- should be able to activate the account;

RN

- should not be able to activate the account if code_active invalid;

Get by id:

RF

- should be able to search user by id;

RN

- should not be able to search user by id if user not exists;

Get all:

RF

- should be able to list users;
