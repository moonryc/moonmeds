import {useEffect} from "react";

export const useOnMount = (anonymousFunction:()=>void)=>{
    useEffect(anonymousFunction,[])
}