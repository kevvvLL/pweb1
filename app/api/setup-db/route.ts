import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS posts (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        tags TEXT[]
      );
    `;
        return NextResponse.json({ message: 'Database created successfully' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
