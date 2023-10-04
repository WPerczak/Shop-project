export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
}