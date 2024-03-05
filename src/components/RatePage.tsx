'use client'
import React from 'react'
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import RateCard from './RateCard';
import styles from '../../public/styles/Carousel.module.css'
import cc from "classcat";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";


const RatePage=()=>{

	const photo=[
		{
			'id':1,
			'name':'Nguyễn Văn A',
			'avatar':'https://png.pngtree.com/png-clipart/20221125/ourlarge/pngtree-avatar-boy-cool-unifrom-and-look-charming-png-image_6480045.png',
			'content': '.............'
		},
		{
			'id':2,
			'name':'Nguyễn Văn B',
			'avatar':'https://as2.ftcdn.net/v2/jpg/05/38/77/09/1000_F_538770913_K514x2SdKFGy1BcSnTxSfPIeivmmzBaP.jpg',
			'content': 'zzz'
		},
		{
			'id':3,
			'name':'Nguyễn Văn C',
			'avatar':'',
			'content': 'zzz'
		},
		{
			'id':4,
			'name':'Nguyễn Văn D',
			'avatar':'',
			'content': 'zzz'
		},
		{
			'id':5,
			'name':'Nguyễn Văn E',
			'avatar':'',
			'content': 'zzz'
		},
		{
			'id':6,
			'name':'Nguyễn Văn F',
			'avatar':'',
			'content': 'zzz'
		}
	]

	const [loaded, setLoaded] = React.useState<any>([]);
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [visibleSlides, setVisibleSlides] = React.useState(0);
	const [sliderRef, slider] = useKeenSlider({
		initial: 0,
		slideChanged(s) {
		  setCurrentSlide(s.details().relativeSlide);
		  setVisibleSlides(s.details().slidesPerView);
		},
		spacing: 10,
		slidesPerView: 1,
		centered: false,
		loop: false,
		mode: "snap",
		breakpoints: {
		  "(min-width: 641px)": {
		    slidesPerView: 1,
		    mode: "free-snap"
		  },
		  "(min-width: 768px)": {
		    slidesPerView: 2,
		    mode: "free-snap"
		  },
		  "(min-width: 1024px)": {
		    slidesPerView: 3,
		    mode: "free-snap"
		  },
		}
	});
	React.useEffect(() => {
	    // const fullLoad = [...Array(currentSlide + visibleSlides + 1).keys()];
	    // const new_loaded = [...fullLoad];
		const new_loaded = Array(currentSlide + visibleSlides + 1).fill(false);	
	    new_loaded[currentSlide] = true;
	    setLoaded(new_loaded);
	  }, [currentSlide, visibleSlides]);
	return(
		<section>
			<h2 className=" mb-5 text-center">Khách hàng yêu thích dịch vụ</h2>

			<div className="my-5 pt-4 navigation-wrapper">
				<div
					ref={sliderRef as React.RefObject<HTMLDivElement>}
					className={`${styles.keenSlider} ${"keen-slider"}`}
				>
					{photo.map((photo, idx) => (
						<div
						// ["keen-slider__slide"],["lazy__slide"]
						  className={cc(["keen-slider__slide"])}
						  key={idx}
						>
							<RateCard
								id={photo.id}
								name={photo.name}
								avatar={photo.avatar}
								content={photo.content}
							/>
						</div>
					))}
					{slider && (
					<>
					  <ArrowLeft
					    onClick={(e:any) => e.stopPropagation() || slider.prev()}
					    disabled={currentSlide === 0}
					  />
					  <ArrowRight
					    onClick={(e:any) => e.stopPropagation() || slider.next()}
					    disabled={
					      currentSlide >=
					      slider.details().size - slider.details().slidesPerView
					    }
					  />
					</>
					)}
				</div>
			</div>

		</section>
	)
	
}


	function ArrowLeft(props:any) {
	    return (
	    <div
	      onClick={props.onClick}
	      className={cc([
	        styles.arrowLeft,
	        styles.arrow,
	        { [styles.arrowDisabled]: props.disabled }
	      ])}
	    >
	      <BsFillCaretLeftFill />
	    </div>
	  );
	}

	function ArrowRight(props:any) {
	    return (
	    <div
	      onClick={props.onClick}
	      className={cc([
	        styles.arrowRight,
	        styles.arrow,
	        { [styles.arrowDisabled]: props.disabled }
	      ])}
	    >
	      <BsFillCaretRightFill />
	    </div>
	  );
	}  
export default RatePage;