import Input from '@/components/Input';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main className="py-10 px-4 bg-primary-color h-screen flex flex-col justify-end items-center">
      <Image
        className="w-[60%] mb-12"
        src={'/logo.svg'}
        alt={'logo'}
        width={100}
        height={100}
      />
      <div className="w-full mt-12 flex flex-col gap-16 justify-center items-center">
        <h1 className="w-full px-4 leading-tight text-white text-4xl">
          Shorten your links,
          <br />
          Just like that.
        </h1>
        <Input />
      </div>
    </main>
  );
}
