import startDB from '@/lib/db';
import { NextResponse } from 'next/server';
import link from '@/models/link';

export async function GET(req: Request) {
  try {
    await startDB();
    const Links = await link.find();
    if (!Links) {
      return NextResponse.json({ message: 'No links found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: Links,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
