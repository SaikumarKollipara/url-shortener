import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/db';
import Link from '@/models/link';
import { generateUniqueId } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const originalURL = req.nextUrl.searchParams.get('url');
    // Check if link already exists, if so return existed link else return new link
    const existedLink = await Link.findOne({ originalURL });
    if (existedLink)
      return NextResponse.json(
        {
          shortenedURL: process.env.APP_URL + '/' + existedLink.shortID,
        },
        { status: 200 }
      );
    const newLink = await Link.create({
      originalURL,
      shortID: generateUniqueId(),
    });
    return NextResponse.json(
      {
        shortenedURL: process.env.APP_URL + '/' + newLink.shortID,
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
