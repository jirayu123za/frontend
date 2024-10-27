"use client";

import { Button, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function notfound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Image
        src="/404.svg"
        w={800}
        h={800}
        alt="404"
        className="object-contain"
      />
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
