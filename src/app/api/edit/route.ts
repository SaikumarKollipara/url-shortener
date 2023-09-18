import connectDB from '@/lib/db';
import Link from '@/models/link';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const from = req.nextUrl.searchParams.get('from') as string;
    const to = req.nextUrl.searchParams.get('to') as string;
    const existedURL = await Link.findOne({ shortID: to });
    if (existedURL)
      return NextResponse.json(
        { message: 'ID already existed!' },
        { status: 400 }
      );
    const URL = await Link.findOne({ shortID: from });
    const newURL = await Link.create({
      originalURL: URL.originalURL,
      shortID: to,
      isEdited: true,
    });
    return NextResponse.json(
      {
        shortenedURL: process.env.APP_URL + '/' + newURL.shortID,
        message: 'Edited successfully!',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
