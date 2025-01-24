import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Definisikan interface untuk Firebase Auth Error
interface FirebaseAuthError extends Error {
    code: string;
    message: string;
}

// Cek apakah error adalah FirebaseAuthError
function isFirebaseAuthError(error: unknown): error is FirebaseAuthError {
    return (
        error !== null &&
        typeof error === 'object' &&
        'code' in error &&
        'message' in error
    );
}

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

const db = adminApp.firestore();

export async function POST(request: Request) {
    try {
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            return NextResponse.json(
                { error: 'Konfigurasi server tidak lengkap' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { email, password, uid, namaLengkap } = body;

        if (!email || !password || !uid || !namaLengkap) {
            return NextResponse.json(
                { error: 'Email, password, UID, dan nama lengkap harus diisi' },
                { status: 400 }
            );
        }

        try {
            const userRecord = await adminApp.auth().createUser({
                email: email,
                password: password,
                displayName: namaLengkap,
                emailVerified: false,
                disabled: false
            });

            await adminApp.auth().setCustomUserClaims(userRecord.uid, {
                role: 'guru'
            });

            await db.collection('accounts').doc(uid).update({
                uid: userRecord.uid,
                namaLengkap: namaLengkap,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            return NextResponse.json({
                success: true,
                uid: userRecord.uid,
                message: 'Admin berhasil dibuat'
            });
        } catch (error: unknown) {
            if (isFirebaseAuthError(error)) {
                switch (error.code) {
                    case 'auth/email-already-exists':
                        return NextResponse.json(
                            { error: 'Email sudah terdaftar' },
                            { status: 400 }
                        );
                    case 'auth/invalid-email':
                        return NextResponse.json(
                            { error: 'Format email tidak valid' },
                            { status: 400 }
                        );
                    case 'auth/weak-password':
                        return NextResponse.json(
                            { error: 'Password minimal 6 karakter' },
                            { status: 400 }
                        );
                    default:
                        return NextResponse.json(
                            {
                                error: `Error dari Firebase: ${error.message}`,
                                code: error.code
                            },
                            { status: 400 }
                        );
                }
            }

            return NextResponse.json(
                {
                    error: 'Terjadi kesalahan internal',
                    details: error instanceof Error ? error.message : 'Unknown error'
                },
                { status: 500 }
            );
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