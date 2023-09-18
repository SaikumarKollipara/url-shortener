"use client";
import { isValidURL } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Input() {
  const router = useRouter();
  const [URL, setURL] = useState("");
  const [errorText, setErrorText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (URL === "") return setErrorText("Please provide a link!");
    if (!isValidURL(URL)) return setErrorText("Please provide a valid link!");
    router.push(`/result?url=${encodeURIComponent(URL)}`);
  }

  return (
    <div className="relative w-[95%] sm:max-w-sm">
      <p className="absolute -top-7 left-5 text-sm text-red-400">{errorText}</p>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full rounded-full bg-[#D3C2E4] p-5 pr-16 text-base text-slate-900 outline-none"
          type="text"
          placeholder="Paste your link here"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 mr-1 -translate-y-1/2 rounded-full bg-primary-color p-4 text-2xl text-white"
        >
          <BsArrowRight />
        </button>
      </form>
    </div>
  );
}
