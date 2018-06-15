// TODO: ADD PROPS
export interface User {
  profile: {
    lastname?: string;
    firstname?: string;
    login: string;
    email: string;
  };
  credentials: {
    password: {
      value: string;
    };
  };
}
