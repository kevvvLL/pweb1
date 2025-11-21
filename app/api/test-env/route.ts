import { NextResponse } from 'next/server';

export async function GET() {
    const hasPasswordHash = !!process.env.ADMIN_PASSWORD_HASH;
    const hasSessionSecret = !!process.env.SESSION_SECRET;

    return NextResponse.json({
        passwordHashExists: hasPasswordHash,
        sessionSecretExists: hasSessionSecret,
        passwordHashLength: process.env.ADMIN_PASSWORD_HASH?.length || 0,
        // Don't expose the actual values for security
    });
}
