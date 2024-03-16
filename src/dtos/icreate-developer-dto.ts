export interface ICreateDeveloperDTO {
  name: string;
  role: string;
  email: string;
  techs: string[];
  age: number;
  created_at?: Date;
  updated_at?: Date;
}
