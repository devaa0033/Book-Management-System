import { NextResponse } from "next/server";
import { createUser } from '@/lib/queries/auth.js';
import { memberSchema} from '@/validations/memberSchema.js';
import bcrypt from "bcryptjs";


export async function POST (req) {
    try {
        const body = await req.json();
        
        //Validate input using zod schema
        const validation = memberSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({error: 'Invalid input', details: validation.error.errors},
                {
                    status: 400
                }
            );
        }
        const {name, email, phone, address, password} = validation.data;

        //Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create User in the database
        const result = await createUser({
            name,
            email, 
            phone,
            address,
            password: hashedPassword
        });

        if(result.error) {
            return NextResponse.json({error: result.error}, {status: 400});
        }

        return NextResponse.json({message: 'User registered successfully', userId: result.insertId}, {status: 201});

    } catch (error) {
        console.error('Registration error: ', error);
        return NextResponse.json({error: 'Internal server error'},
            {
                status: 500
            }
        );
    }
}











/*{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "address": "123 Main St, Pune",
    "password": "securePassword123"
}*/

/*{
    "name": "Ria Sharma",
    "email": "riya@example.com",
    "phone": "8975645821",
    "address": "123 Main St, Pune",
    "password": "abc123"
}
    
{
  "name": "Aarav Mehta",
  "email": "aarav.mehta@example.com",
  "phone": "9876543210",
  "address": "101 MG Road, Mumbai",
  "password": "pass@1234"
}


{
  "name": "Priya Iyer",
  "email": "priya.iyer@example.com",
  "phone": "9123456789",
  "address": "56 Residency Road, Bangalore",
  "password": "securePass!1"
}


{
  "name": "Rajesh Kumar",
  "email": "rajesh.kumar@example.com",
  "phone": "9988776655",
  "address": "22 Sector 15, Noida",
  "password": "Rajesh@2024"
}


{
  "name": "Sneha Patel",
  "email": "sneha.patel@example.com",
  "phone": "9012345678",
  "address": "14 Satellite Road, Ahmedabad",
  "password": "Sneha123$"
}



*/