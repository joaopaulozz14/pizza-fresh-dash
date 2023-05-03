export interface User {
  nickname: string;
  name: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface UserUpdate {
  id: string;
  user: User;
}

export interface UserResponse {
  id: string;
  nickname: string;
  name: string;
  password: string;
  confirmPassword: string;
  image: string;
  updatedAt?: string;
  createdAt?: string;
}
