import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Cek apakah Firebase Admin sudah diinisialisasi
let adminApp: admin.app.App;

try {
    adminApp = admin.app();
} catch {
    adminApp = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY
        })
    });
}

export async function POST(request: Request) {
    try {
        const { uid } = await request.json();

        if (!uid) {
            return NextResponse.json(
                { error: 'UID harus diisi' },
                { status: 400 }
            );
        }

        try {
            // Hapus user dari Authentication
            await adminApp.auth().deleteUser(uid);

            return NextResponse.json({
                success: true,
                message: 'User berhasil dihapus dari Authentication'
            });
        } catch (error) {
            if (error instanceof Error) {
                // Handle specific Firebase Auth errors
                if (error.message.includes('auth/user-not-found')) {
                    return NextResponse.json(
                        { error: 'User tidak ditemukan di Authentication' },
                        { status: 404 }
                    );
                }
            }
            throw error;
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Terjadi kesalahan internal',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 