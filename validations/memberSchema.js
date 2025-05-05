import {z} from 'zod';

export const memberSchema = z.object({
    name : z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string(),
    address: z.string(),
})