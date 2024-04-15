"use client"

import PicturesAnimate from "@/components/PicturesAnimate";
import ScrollingText from "@/components/ScrollingText";

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
    <>
      <PicturesAnimate />
      <ScrollingText/>
      <div style={{ paddingTop: '100vh' }}>
        testing
      </div>

    </>
  );
}
