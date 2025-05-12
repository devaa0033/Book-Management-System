import {promisePool} from "../db.js"

export async function getUser(userId) {
    try {
        const [rows] = await promisePool.query('SELECT * FROM account_holders WHERE id = ?', [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}