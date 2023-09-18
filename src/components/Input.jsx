'use client';
import { isValidURL } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function Input() {
  const router = useRouter();
  const [URL, setURL] = useState('');
  const [errorText, setErrorText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (URL === '') return setErrorText('Please provide a link!');
    if (!isValidURL(URL)) return setErrorText('Please provide a valid link!');
    router.push(`/result?url=${encodeURIComponent(URL)}`);
  }

  return (
    <div className="relative w-[95%]">
      <p className="absolute -top-7 left-5 text-red-400 text-sm">{errorText}</p>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full bg-[#D3C2E4] text-base text-slate-900 p-5 pr-16 rounded-full outline-none"
          type="text"
          placeholder="Paste your link here"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />
        <button
          type="submit"
          className="text-white text-2xl mr-1 absolute top-1/2 -translate-y-1/2 right-0 p-4 rounded-full bg-primary-color"
        >
          <BsArrowRight />
        </button>
      </form>
    </div>
  );
}
