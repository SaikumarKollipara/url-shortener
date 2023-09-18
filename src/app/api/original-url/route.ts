import connectDB from '@/lib/db';
import Link from '@/models/link';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shortID = req.nextUrl.searchParams.get('shortid');
  try {
    await connectDB();
    const link = await Link.findOne({ shortID });
    if (!link)
      return NextResponse.json({ message: 'No link found!' }, { status: 400 });
    return NextResponse.json(
      { originalURL: link.originalURL },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
