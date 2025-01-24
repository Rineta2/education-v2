import { NextResponse } from "next/server";

import * as admin from "firebase-admin";

// Cek apakah Firebase Admin sudah diinisialisasi
let adminApp: admin.app.App;

try {
  adminApp = admin.app();
} catch {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = adminApp.firestore();

export async function POST(request: Request) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID guru harus diisi" },
        { status: 400 }
      );
    }

    try {
      // Verify user exists in Firestore first
      const userDoc = await db
        .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
        .doc(uid)
        .get();
      if (!userDoc.exists) {
        return NextResponse.json(
          { error: "Data guru tidak ditemukan di database" },
          { status: 404 }
        );
      }

      // 1. Hapus dari Firestore terlebih dahulu
      await db
        .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
        .doc(uid)
        .delete();

      try {
        // 2. Kemudian hapus dari Firebase Auth
        await adminApp.auth().deleteUser(uid);

        return NextResponse.json({
          success: true,
          message: "Guru berhasil dihapus dari sistem",
        });
      } catch (authError) {
        if (
          authError instanceof Error &&
          authError.message.includes("auth/user-not-found")
        ) {
          return NextResponse.json({
            success: true,
            message: "Data guru berhasil dihapus",
          });
        }
        return NextResponse.json({
          success: true,
          message: "Data guru berhasil dihapus (partial)",
        });
      }
    } catch (error) {
      return NextResponse.json(
        {
          error: "Gagal menghapus guru dari sistem",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Terjadi kesalahan internal",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
