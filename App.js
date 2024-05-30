import React, { useEffect, useRef, useState } from 'react';

const MyComponent = () => {
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const progressBar2Ref = useRef(null);
    const progressBar3Ref = useRef(null);
    const sliderRef = useRef(null);
    const fillRef = useRef(null);
    const slider2Ref = useRef(null);
    const fill2Ref = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const run = (boxRef, progressBarRef) => {
            const box = boxRef.current;
            const progressBar = progressBarRef.current;
            box.addEventListener("mousedown", () => setActive(true));
            document.addEventListener("mouseup", () => setActive(false));
            box.addEventListener("mousemove", e => {
                if (active) {
                    const mX = e.clientX;
                    const mY = e.clientY;
                    const boxData = box.getBoundingClientRect();
                    const boxWidth = boxData.width;
                    const boxHeight = boxData.height;
                    const l = boxData.left;
                    const t = boxData.top;

                    let rotate = 0;
                    const radians = 180 / Math.PI;
                    const center = {
                        x: l + (boxWidth / 2),
                        y: t + (boxHeight / 2)
                    };
                    const x = mX - center.x;
                    const y = mY - center.y;
                    let angle = Math.floor(Math.atan2(y, x) * radians);
                    const startAngle = 180;

                    if (angle < 0 && angle > -180) {
                        rotate = angle + startAngle;
                        box.style.transform = `rotate(${rotate}deg)`;
                        let progress = rotate + 5;
                        if (boxRef === box2Ref && progressBarRef === progressBar2Ref) {
                            progress = rotate + 150;
                            progressBar.style.transform = `rotate(${progress}deg)`;
                        }

                        if (boxRef === box3Ref && progressBarRef === progressBar3Ref) {
                            progress = rotate + 150;
                            progressBar.style.transform = `rotate(${progress}deg)`;
                        }
                    }
                }
            });
        };

        run(box2Ref, progressBar2Ref);
        run(box3Ref, progressBar3Ref);
    }, [active]);

    const setBar = () => {
        fillRef.current.style.width = `${sliderRef.current.value}%`;
    };

    const setBar2 = () => {
        fill2Ref.current.style.width = `${slider2Ref.current.value}%`;
    };

    return (
        <div>
            <div className="container-knob-2">
                <div id="progress-bar-2" ref={progressBar2Ref}>
                    <div id="grey-circle"></div>
                    <div id="blue-circle"></div>
                </div>
                <div id="box-2" className="box" ref={box2Ref}>
                    <div className="circle">
                        <div id="dot-2" className="dot"></div>
                    </div>
                </div>
                <p className="knob-description">Volume</p>
            </div>
            <div className="container-knob-3">
                <div id="progress-bar-3" ref={progressBar3Ref}>
                    <div id="white-circle"></div>
                    <div id="yellow-circle"></div>
                </div>
                <div id="box-3" className="box" ref={box3Ref}>
                    <div className="circle">
                        <div id="dot-3" className="dot"></div>
                    </div>
                </div>
                <p className="knob-description">Mood</p>
            </div>
          
            <div className="middle">
                <div className="slider-container">
                    <p className="slider-label">Intensity</p>
                    <span className="bar"><span className="fill" ref={fillRef}></span></span>
                    <input id="slider" className="slider" type="range" min="0" max="100" value="50" ref={sliderRef} onChange={setBar} />
                </div>
                <div className="slider-container">
                    <p className="slider-label">Weather</p>
                    <span className="bar"><span className="fill" ref={fill2Ref}></span></span>
                    <input id="slider2" className="slider" type="range" min="0" max="100" value="50" ref={slider2Ref} onChange={setBar2} />
                </div>
            </div>
        </div>
    );
};

export default MyComponent;


