import { NextResponse } from "next/server";
import { loginUser } from '@/lib/queries/auth.js';
import {loginSchema} from '@/validations/memberSchema.js';


export async function POST(req) {
    try {
        const body = await req.json();
        const validation = loginSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({error: 'Invalid input', details: validation.error.errors},
                {
                    status: 400
                }
            );
        }
        const {email, password} = validation.data;
        const result = await loginUser({email, password});
        if(result.error) {
            return NextResponse.json({error: result.error}, {status: 400});
        }
        return NextResponse.json({message: 'User logged in successfully', user: result.user}, {status: 200});
    } catch (error) {
        console.error('Registration error: ', error);
        return NextResponse.json({error: 'Internal server error'},
            {
                status: 500
            }
        );
    }
}
