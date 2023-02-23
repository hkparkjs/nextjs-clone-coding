import axios from 'axios';
import { UserType } from '../../types/user';

//* 회원가입 body
interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

//* 회원가입 api
export const signupAPI = (body: SignUpAPIBody) => axios.post<UserType>("/api/auth/signup", body);

//* 로그인 api
export const loginAPI = (body: { email: string; password: string }) => axios.post<UserType>("/api/auth/login", body);

//* 쿠키의 access_token의 유저 정보 받아오는 api
/* TODO : http://localhost:3000/을 붙이지 않으면 (AxiosError: connect ECONNREFUSED 127.0.0.1:80) 발생
          없앴을 때도 동작하도록 확인필요. */
export const meAPI = () => axios.get<UserType>("http://localhost:3000/api/auth/me");