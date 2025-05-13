import bcrypt from "bcryptjs";
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

export async function loginUser({email, password}) {
    try {
        const [users] = await promisePool.query('SELECT * FROM account_holders WHERE email = ?', [email]);
        const user = users[0];

        if(!user) {
            return {error: 'User not found'};
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return {error: 'Invalid credentials'};
        }

        const {password: _, ...userData} = user;
        return {user: userData};
    } catch (error) {
        console.error('Database error:', error);
        return {error: 'Databse error'};
    }
}


export async function storeRefreshToken(userId, refreshToken){
    try {
        await promisePool.query('UPDATE account_holders SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);
    } catch (error) {
        console.error('Error storing refresh token:', error);
        throw error;
    }
}


export async function signOutUser(userId){
    try {
        await promisePool.query('UPDATE account_holders SET refresh_token = NULL WHERE id = ?', [userId]);
    } catch (error) {
        console.error('Error signing out user:', error);
        throw error;
    }
}