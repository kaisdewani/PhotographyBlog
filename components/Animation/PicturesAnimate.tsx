"use client"


import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import "./animatepicture.css";

const videoSources = [
  process.env.REACT_APP_VIDEO_URL_1 || "https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4",
  process.env.REACT_APP_VIDEO_URL_2 || "https://videos.pexels.com/video-files/19757074/19757074-uhd_3840_2160_30fps.mp4",
  process.env.REACT_APP_VIDEO_URL_3 || "https://videos.pexels.com/video-files/20315562/20315562-hd_1920_1080_30fps.mp4"
];

const PicturesAnimate = () => {
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 360]); // Vertical movement range
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]); // Horizontal movement to the left

  return (
    <div className="video-stack-wrapper">
      <div className="video-stack">
        {videoSources.map((src, index) => {
          if (index === 1) {
            return (
              <motion.video key={index} className="video secondvideo" style={{ x, y }} autoPlay loop muted>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            );
          }
          return (
            <video key={index} className={`video ${index === 0 ? 'firstvideo' : index === 2 ? 'thirdvideo' : ''}`} autoPlay loop muted>
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        })}
      </div>
    </div>
  );
};

export default PicturesAnimate;
