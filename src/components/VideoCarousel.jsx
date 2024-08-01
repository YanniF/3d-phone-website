import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {hightlightsSlides} from '../constants/index.js';
import {pauseImg, playImg, replayImg} from '../utils/index.js';
import {useGSAP} from '@gsap/react';

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

  useGSAP(() => {
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => setVideo(prev => ({
        ...prev,
        startPlay: true,
        isPlaying: true
      }))
    })
  }, [finished, videoId])

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

  const handleProcess = (action, i) => {
    switch (action) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, finished: true, videoId: i + 1 }));
        break;
      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case 'video-reset':
        setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  }

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

      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={isLastVideo ? () => handleProcess('video-reset') :
              !isPlaying ? () => handleProcess('play') : handleProcess('pause')}
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
