enum UserAccountLevel {
  BASE = 0,
  PREMIUM = 1
}

interface User {
  id: number,
  login: string,
  password: string,
  accountLevel: UserAccountLevel,
  firstName: string,
  lastName: string,
  rate: number
}