import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import bcrypt from 'bcryptjs';
import { StoredUserType } from '../../../types/user';
import jwt from 'jsonwebtoken';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstname, lastname, password, birthday } = req.body;
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  if (req.method === 'POST') {
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일입니다.");
    }

    const users = Data.user.getList();
    console.log(users);
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: "",
    };

    Data.user.write([...users, newUser]);

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; httponly`
    );
    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};