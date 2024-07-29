import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {hightlightsSlides} from '../constants/index.js';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    finished: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const {finished, isLastVideo, startPlay, videoId, isPlaying} = video

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  useEffect(() => {
    const currentProgress = 0
    const span = videoSpanRef.current

    if (span[videoId]) {
      // animate the progress of the video
      const animation = gsap.to(span[videoId], {
        onUpdate: () => {

        },
        onComplete: () => {
        }
      })
    }
  }, [videoId, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="#video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))
                  }}
                >
                  <source src={list.video} type="video/mp4"/>
                </video>
              </div>

              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map(text => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>hi</div>
    </>
  )
}

export default VideoCarousel
