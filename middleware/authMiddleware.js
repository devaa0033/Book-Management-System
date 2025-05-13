import { NextResponse } from "next/server";
import { promisePool } from "../lib/db.js";


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
 
 
const JWT_ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
 
//GENERATE ACCESS TOKEN(short-live)
export const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.name
    };
    const token = jwt.sign(payload, JWT_ACCESS_SECRET,
        {
            
            expiresIn :  process.env.EXPIRE_ACCESS_TOKEN
           
        }
    );
    return token;
}
 
 
 
//GENERATE REFRESH TOKEN(long-live)
export const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        username: user.name
    };
    const token = jwt.sign(payload, JWT_REFRESH_SECRET,
        {
            expiresIn : process.env.EXPIRE_REFRESH_TOKEN
        }
    );
    return token;
}
 
 
 
//VERIFY ACCESS TOKEN
export const VERIFY_ACCESS_TOKEN = async (req) => {
    try {
      const token =
        req.headers.get("Authorization")?.split(" ")[1] ||
        req.cookies.get("accessToken")?.value;
  
      console.log("Access Token:", token);
      console.log("JWT_ACCESS_SECRET:", JWT_ACCESS_SECRET);
  
      if (!token) {
        return { success: false, response: NextResponse.json({ message: "Token not found" }, { status: 400 }) };
      }
  
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
  
      const query = "SELECT * FROM account_holders WHERE id = ?";
      const [data] = await promisePool.query(query, [decoded.id]);
  
      if (data.length === 0) {
        return { success: false, response: NextResponse.json({ message: "User not found" }, { status: 404 }) };
      }
  
      return { success: true, id: decoded.id };
  
    } catch (error) {
      console.error("JWT verify error:", error.message);
      if (error.name === "TokenExpiredError") {
        return { success: false, response: NextResponse.json({ message: "Token expired" }, { status: 401 }) };
      }
  
      return { success: false, response: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
    }
  };
 
 
 
//VERIFY REFRESH TOKEN
export const VERIFY_REFRESH_TOKEN = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json("Not authenticated!");
    try {
       const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
       req.user = decoded;
       next();
    } catch (error) {
       return res.status(403).json("Token is not valid!");
    }
}