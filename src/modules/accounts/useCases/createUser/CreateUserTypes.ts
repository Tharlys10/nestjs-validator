type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
  account_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export { CreateUserInput, CreateUserOutput };
