import React from 'react';
import PropTypes from 'prop-types';
import "./animatepicture.css";

const videoSources = [
  process.env.REACT_APP_VIDEO_URL_1 || "https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4",
  process.env.REACT_APP_VIDEO_URL_2 || "https://videos.pexels.com/video-files/19757074/19757074-uhd_3840_2160_30fps.mp4",
  process.env.REACT_APP_VIDEO_URL_3 || "https://videos.pexels.com/video-files/20315562/20315562-hd_1920_1080_30fps.mp4"
];

const PicturesAnimate = () => {
  return (
    <div className="video-stack-wrapper">
      <div className="video-stack">
        {videoSources.map((src, index) => (
          <video key={index} className={`video ${index === 0 ? 'firstvideo' : index === 1 ? 'secondvideo' : 'thirdvideo'}`} autoPlay loop muted>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

// Type checking for props
PicturesAnimate.propTypes = {
  videoSources: PropTypes.arrayOf(PropTypes.string)
};

export default PicturesAnimate;
