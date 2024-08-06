import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/all';
import {hightlightsSlides} from '../constants/index.js';
import {pauseImg, playImg, replayImg} from '../utils/index.js';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const {isEnd, isLastVideo, startPlay, videoId, isPlaying} = video

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power1.inOut',
    })

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0
    const span = videoSpanRef.current

    if (span[videoId]) {
      const animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress

            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760
                ? '10vw' // mobile
                : window.innerWidth < 1200
                  ? '10vw' // tablet
                  : '4vw', // laptop
            })

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: '#fff',
            })
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })

      if(videoId === 0) {
        animation.restart()
      }

      // update the progress bar
      const animUpdate = () => {
        animation.progress(
          videoRef.current[videoId].currentTime /
          hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleLoadedMetaData = (e) => {
    setLoadedData(prev => [...prev, e])
  }

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({...prev, isEnd: true, videoId: i + 1}));
        break;

      case 'video-last':
        setVideo((prev) => ({...prev, isLastVideo: true}));
        break;

      case 'video-reset':
        setVideo((prev) => ({...prev, videoId: 0, isLastVideo: false}));
        break;

      case 'pause':
        setVideo((prev) => ({...prev, isPlaying: !prev.isPlaying}));
        break;

      case 'play':
        setVideo((prev) => ({...prev, isPlaying: !prev.isPlaying}));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(e)}
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
              key={'video-' + i}
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
        <button className="control-btn" onClick={
          isLastVideo
            ? () => handleProcess('video-reset')
            : !isPlaying
              ? () => handleProcess('play')
              : () => handleProcess('pause')
        }>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
