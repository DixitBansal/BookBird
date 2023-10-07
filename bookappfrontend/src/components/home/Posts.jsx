import Cards from './Cards';
import { LoadingPosts } from '../LoadingPosts';
//hooks
import { useLazyLoad } from "./useLazyLoad";
import { useRef } from "react";

export const Posts = ({ callBackProp, initdata, initCurrentPage }) => {
    const triggerRef = useRef(null);
    
    /**
     * props : {
     *      root of the intersection observer,
     *      callBackProp,
     *               -- @param of currentPage
     *               -- @return data which will be rendered on the display
     *      
     * }
     */
    
    const { postData, showLoading } = useLazyLoad(
        initdata, initCurrentPage,
        triggerRef, callBackProp,
        {
            root: document,
            threshold: 0
        }
        )
    
    return (
        <>
            <div className="m-auto w-full">
                {postData.map((element, index) => {
                    return <Cards data={element} key={index} />
                })}
            </div>
            <div ref={triggerRef} className={showLoading ? "visible" : "hidden"}>
                <LoadingPosts className={showLoading ? "visible" : "invisible"} />
            </div>
        </>
    );
}