"use client"

import PicturesAnimate from "@/components/Animation/PicturesAnimate";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PicturesAnimate />
      <p className="bg-red-400">Something something</p>
    </main>
  );
}
