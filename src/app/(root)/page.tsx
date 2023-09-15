import Image from 'next/image';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

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
      <div className="w-full mt-4 flex flex-col gap-16 justify-center items-center">
        <h1 className="w-full px-4 leading-tight text-white text-4xl">
          Shorten your links,
          <br />
          Just like that.
        </h1>
        <div className="relative w-[95%]">
          <input
            className="w-full bg-[#D3C2E4] text-base text-slate-900 p-5 rounded-full outline-none"
            type="text"
            placeholder="Paste your link here"
          />
          <button className="text-white text-2xl mr-1 absolute top-1/2 -translate-y-1/2 right-0 p-4 rounded-full bg-primary-color">
            <BsArrowRight />
          </button>
        </div>
      </div>
    </main>
  );
}
