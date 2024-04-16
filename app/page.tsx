"use client"
import PicturesAnimate from "@/components/PicturesAnimate";

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
      <div style={{ paddingTop: '92vh' , paddingLeft: '8rem'  }}>
        <p>this is some text</p>
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
