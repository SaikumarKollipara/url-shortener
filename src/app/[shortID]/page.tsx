import { redirect } from 'next/navigation';

interface ShortIDProps {
  params: { shortID: string };
}

export default async function ShortID({ params }: ShortIDProps) {
  let message: string;
  const res = await fetch(
    `${process.env.APP_URL}/api/original-url?shortid=${encodeURIComponent(
      params.shortID
    )}`,
    {
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  if (res.ok) redirect(data?.originalURL);
  else message = data.message;
  return <div>{message}</div>;
}
