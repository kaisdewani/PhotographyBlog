"use client"
import PicturesAnimate from "@/components/PicturesAnimate";
import RevealText from "@/components/RevealText";

import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";


import ParallaxPictures from "@/components/ParallaxPictures";
import GridAlbums from "@/components/GridAlbums";



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
      <div style={{ paddingTop: '90vh' }}>
        <RevealText />
      </div>
      {/* <div style={{ paddingTop: '120vh' }}> */}
      <ParallaxPictures />
      {/* </div> */}
      {/* <div style={{ paddingTop: '3vh' }}> */}
      <GridAlbums />
      {/* </div> */}
    </>
  );
}
