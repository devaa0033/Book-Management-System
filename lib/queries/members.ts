import { promisePool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Member extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function findMemberByEmail(email: string): Promise<Member | null> {
  const [rows] = await promisePool.query<Member[]>(
    'SELECT * FROM members WHERE email = ?',
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
}