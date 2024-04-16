"use client"
import PicturesAnimate from "@/components/PicturesAnimate";
import RevealText from "@/components/RevealText";

import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <PicturesAnimate />
      <div style={{ paddingTop: '90vh', paddingLeft: '8rem' }}>
        <RevealText />
      </div>
      <div style={{ paddingTop: '120vh' }}>
        <h1>something</h1>
      </div>
      <div style={{ paddingTop: '120vh' }}>
        <h1>something</h1>
      </div>
    </>
  );
}
