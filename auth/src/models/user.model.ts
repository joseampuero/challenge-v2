export type UserProperties = {
  readonly name: string;
  readonly password: string;
};

export interface User {
  findUserByName: (name: string) => UserProperties;
}

export class UserImplement implements User {
  private readonly users: UserProperties[] = [
    { name: 'admin', password: 'admin' },
  ];

  findUserByName(name: string): UserProperties {
    return this.users.find((u) => u.name == name);
  }
}
