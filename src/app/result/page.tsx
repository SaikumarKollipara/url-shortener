"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";

export default function Result() {
  const searchParams = useSearchParams();
  const originalURL = searchParams.get("url");

  const [message, setMessage] = useState({ text: "", success: true });
  const [shortID, setShortID] = useState("");
  const [appURL, setAppURL] = useState("");
  const [data, setData] = useState({
    shortenedURL: "",
  });

  async function handleEdit() {
    const res = await fetch(
      `/api/edit?from=${data.shortenedURL.split("/").pop()}&to=${shortID}`,
      {
        cache: "no-store",
      },
    );
    const json = await res.json();
    if (!res.ok) return setMessage({ text: json.message, success: false });
    setMessage({ text: json.message, success: true });
    updateStates(json);
  }

  function updateStates(data: any) {
    console.log(data);
    const shortenedURL = new URL(data.shortenedURL);
    setData(data);
    setAppURL(shortenedURL.origin + "/");
    setShortID(shortenedURL.pathname.split("/").pop() || "");
  }

  useEffect(() => {
    fetch(`/api/shorten?url=${originalURL}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => updateStates(data))
      .catch((err) => console.log(err));
  }, [originalURL]);

  return (
    <main className="flex h-screen bg-secondary-color p-4 px-5">
      <div className="hidden w-[50%] justify-center sm:flex">
        <Image
          className="w-[60%] lg:w-[35%]"
          src={"/logo.svg"}
          alt={"logo"}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col sm:h-full sm:max-w-md sm:justify-center">
        <h1 className="mt-20 w-full text-4xl font-bold leading-tight sm:mt-0">
          Here is your shortened link.
        </h1>

        <div className="mt-20 flex w-full flex-col gap-8 sm:mt-10">
          <div className="relative w-full">
            <p className="w-full overflow-x-scroll rounded-full bg-white py-5 pl-5 pr-6 text-xl font-normal text-slate-900 outline-none">
              {appURL + shortID}
            </p>
            <button
              className="absolute right-0 top-1/2 mr-6 -translate-y-1/2 text-2xl"
              onClick={() =>
                navigator.clipboard.writeText(data?.shortenedURL || "")
              }
            >
              <MdContentCopy />
            </button>
          </div>

          <div className="relative w-full">
            <p
              className={`text-md absolute -top-6 left-5 font-semibold ${
                message.success ? "text-green-900" : "text-red-900"
              }`}
            >
              {message.text}
            </p>
            <input
              className="w-full rounded-full bg-white p-5 px-7 text-xl font-normal text-slate-900 outline-none"
              value={shortID.split("/").pop()}
              onChange={(e) => setShortID(e.target.value)}
              minLength={1}
            />
            <FiEdit2
              className="absolute right-0 top-1/2 mr-6 -translate-y-1/2 cursor-pointer text-2xl"
              onClick={handleEdit}
            />
          </div>
        </div>
        <Link
          className="fixed bottom-4 left-1/2 w-[95%] -translate-x-1/2 sm:relative sm:left-0 sm:mt-16 sm:max-w-sm sm:translate-x-1"
          href={"/"}
        >
          <button className="absolute left-0 top-1/2 ml-1 -translate-y-1/2 rounded-full  bg-secondary-color p-4 text-2xl text-black">
            <BsArrowLeft />
          </button>
          <div className="w-full rounded-full bg-primary-color p-5 text-center text-xl font-light text-white outline-none">
            Convert more
          </div>
        </Link>
      </div>
    </main>
  );
}
