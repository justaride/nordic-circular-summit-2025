import { NextResponse } from 'next/server';

export async function GET() {
    return new NextResponse(process.env.GIT_COMMIT_SHA || 'unknown', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-store, max-age=0',
        },
    });
}
