import Input from "@/components/Input";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-end bg-primary-color px-4 py-10 sm:flex-row">
      <div className="mb-12 flex w-[100%] justify-center">
        <Image
          className="w-[60%] lg:w-[35%]"
          src={"/logo.svg"}
          alt={"logo"}
          width={100}
          height={100}
        />
      </div>
      <div className="mt-12 flex w-full flex-col justify-center gap-16">
        <h1 className="w-full px-4 text-4xl font-normal leading-tight text-white md:font-bold lg:text-5xl lg:leading-tight">
          Shorten your links,
          <br />
          Just like that.
        </h1>
        <Input />
      </div>
    </main>
  );
}
