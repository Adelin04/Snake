export function setPhoto(src,key){
   return <img className="img" src={src} key={()=>{key.map(e=>{return e})}} width="20px"/* {`${20}px`} */ height="20px" /* {`${20}px`} */  alt={'cell'}/>
} 