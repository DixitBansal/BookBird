import React from 'react'
import Carousel from 'react-material-ui-carousel'
// components
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Postdesccarousel = ({ data }) => {
    return (
        <>
            <Carousel
                NextIcon={
                    <NavigateNextIcon />
                }
                PrevIcon={
                    <NavigateBeforeIcon />
                }
                navButtonsAlwaysVisible={true}
                sx={{
                    maxHeight: "270px",
                    minHeight: "270px"
                }}
                animation='slide'
                cycleNavigation={true}
                swipe={true}
            >
                {
                    data.img_urls.split(",").map((element, index) => {
                        return (
                            <div key={index} className='h-[230px] overflow-hidden'>
                                <img className='h-[230px] w-full object-cover' src={element} />
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )
}

export default Postdesccarousel