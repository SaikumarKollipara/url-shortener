'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';

export default function Result() {
  const searchParams = useSearchParams();
  const originalURL = searchParams.get('url');

  const [message, setMessage] = useState({ text: '', success: true });
  const [shortID, setShortID] = useState('');
  const [appURL, setAppURL] = useState('');
  const [data, setData] = useState({
    shortenedURL: '',
  });

  async function handleEdit() {
    const res = await fetch(
      `/api/edit?from=${data.shortenedURL.split('/').pop()}&to=${shortID}`,
      {
        cache: 'no-store',
      }
    );
    const json = await res.json();
    if (!res.ok) return setMessage({ text: json.message, success: false });
    setMessage({ text: json.message, success: true });
    updateStates(json);
  }

  function updateStates(data: any) {
    const shortenedURL = new URL(data.shortenedURL);
    setData(data);
    setAppURL(shortenedURL.origin + '/');
    setShortID(shortenedURL.pathname.split('/').pop() || '');
  }

  useEffect(() => {
    fetch(`/api/shorten?url=${originalURL}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => updateStates(data))
      .catch((err) => console.log(err));
  }, [originalURL]);

  return (
    <main className="p-4 bg-secondary-color flex flex-col items-center h-screen">
      <h1 className="w-full mt-20 text-4xl leading-tight">
        Your shortened link is here.
      </h1>

      <div className="relative w-[95%] mt-20">
        <p className="overflow-x-scroll w-full bg-white text-xl font-normal text-slate-900 py-5 pl-5 pr-6 rounded-full outline-none">
          {appURL + shortID}
        </p>
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 text-2xl mr-6"
          onClick={() =>
            navigator.clipboard.writeText(data?.shortenedURL || '')
          }
        >
          <MdContentCopy />
        </button>
      </div>

      <div className="relative w-[95%] mt-8">
        <p
          className={`absolute -top-6 left-5 text-sm ${
            message.success ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
        <input
          className="w-full bg-white text-xl font-normal text-slate-900 p-5 px-7 rounded-full outline-none"
          value={shortID.split('/').pop()}
          onChange={(e) => setShortID(e.target.value)}
          minLength={1}
        />
        <FiEdit2
          className="absolute top-1/2 right-0 -translate-y-1/2 text-2xl mr-6"
          onClick={handleEdit}
        />
      </div>

      <Link className="fixed bottom-4 w-[95%]" href={'/'}>
        <button className="text-black text-2xl absolute top-1/2 -translate-y-1/2 left-0  ml-1 p-4 rounded-full bg-secondary-color">
          <BsArrowLeft />
        </button>
        <div className="w-full bg-primary-color text-center text-xl font-light text-white p-5 rounded-full outline-none">
          Convert more
        </div>
      </Link>
    </main>
  );
}
