import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const SECRET_KEY = new TextEncoder().encode(process.env.SESSION_SECRET || 'default_secret_key');

export interface SessionData {
    isAuthenticated: boolean;
    expiresAt: number;
}

export async function verifyPassword(password: string): Promise<boolean> {
    console.log('[AUTH] Verifying password...');
    console.log('[AUTH] Password hash exists:', !!ADMIN_PASSWORD_HASH);
    console.log('[AUTH] Password hash length:', ADMIN_PASSWORD_HASH?.length || 0);

    if (!ADMIN_PASSWORD_HASH) {
        console.error('[AUTH] ADMIN_PASSWORD_HASH not set in environment variables');
        return false;
    }

    const result = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('[AUTH] Password verification result:', result);

    return result;
}

// Create session token
export async function createSession(): Promise<string> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session: SessionData = {
        isAuthenticated: true,
        expiresAt: expiresAt.getTime(),
    };

    const token = await new SignJWT(session as any)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(expiresAt)
        .sign(SECRET_KEY);

    return token;
}

// Verify session token
export async function verifySession(token: string): Promise<SessionData | null> {
    try {
        const verified = await jwtVerify(token, SECRET_KEY);
        return verified.payload as unknown as SessionData;
    } catch (error) {
        return null;
    }
}

// Get current session from cookies
export async function getSession(): Promise<SessionData | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) return null;

    return verifySession(token);
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session?.isAuthenticated === true;
}

// Hash password (utility for generating password hash)
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}
