import { NextApiRequest, NextApiResponse } from 'next';

import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const room = Data.room.find(Number(id as string));
      if (room) {
        const host = Data.user.find({ id: room.hostId });
        if (host) {
          const newUserWithoutPassword: 
        }
      }
    }
  }
};