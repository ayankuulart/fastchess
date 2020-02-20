enum UserAccountLevel {
  BASE = 0,
  PREMIUM = 1,
}

interface User {
  id?: number;
  login: string;
  password: string;
  age?: number;
  accountLevel?: UserAccountLevel;
  firstName?: string;
  lastName?: string;
  rate?: number;
}

interface HeadersWithAuth extends Headers {
  authorization: string;
}

interface RequestWithAuth extends Request {
  headers: HeadersWithAuth;
}
