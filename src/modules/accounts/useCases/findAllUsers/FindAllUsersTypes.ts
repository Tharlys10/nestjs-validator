type FindAllUsersInput = {
  name?: string;
  page: number;
  amount: number;
};

type FindAllUsersOutput = {
  id: string;
  name: string;
  email: string;
  account_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export { FindAllUsersInput, FindAllUsersOutput };
