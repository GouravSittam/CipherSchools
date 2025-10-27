import { NextRequest, NextResponse } from 'next/server';
import { cleanupDatabase } from '../../../lib/utils/cleanupDatabase';

export async function POST(request: NextRequest) {
    try {
        // Add a simple security check - you can modify this
        const body = await request.json();
        const { confirmCleanup } = body;

        if (confirmCleanup !== 'YES_DELETE_ALL_EXCEPT_WELCOME') {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Confirmation required. Send { "confirmCleanup": "YES_DELETE_ALL_EXCEPT_WELCOME" }'
                },
                { status: 400 }
            );
        }

        await cleanupDatabase();

        return NextResponse.json({
            success: true,
            message: 'Database cleanup completed. Only "Welcome to CipherStudio" projects remain.'
        });
    } catch (error) {
        console.error('Error during database cleanup:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to cleanup database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Database cleanup endpoint. Use POST with confirmation to proceed.',
        usage: 'POST with body: { "confirmCleanup": "YES_DELETE_ALL_EXCEPT_WELCOME" }'
    });
}