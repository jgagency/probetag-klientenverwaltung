import {auth} from "./auth.ts";
import {fromNodeHeaders} from "better-auth/node";
import type {Request, Response, NextFunction} from "express";

export async function requireAuth(req: Request, res: Response, next: NextFunction){
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    if(!session){
        return res.status(401).json({ error: 'Nicht eingeloggt' });
    }

    req.user = session.user;
    next();
}