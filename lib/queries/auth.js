import {promisePool} from "../db.js"

export async function createUser({name, email, phone, address, password}) {
    try {
        const [existingUser] = await promisePool.query('SELECT id from account_holders WHERE email = ?', [email]);
        if(existingUser.length > 0) {
            return {error: 'Email already exists'};
        }
        // Insert the new user into the database
        const [result] = await promisePool.query('INSERT INTO account_holders (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)', [name, email, phone, address, password]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        return {error: 'Databse error'};
    }
}