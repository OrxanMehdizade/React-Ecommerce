
import {createContext,useEffect,useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trigger,setTrigger]=useState(false);

  const refreshTokens = async ()=> {
    //console.log(document.cookie);
    //const refreshToken=document.cookie.split("=")[1];

    const token= document.cookie.split("; ")[1];
    const refreshToken=token.split("=")[1];

    const response=await fetch("http://localhost:5000/auth/refresh",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        refreshToken:refreshToken,
      }),
    });

    const ok=response.ok;
    console.log(response);
    if(ok){
      const data= await response.json();

      document.cookie=`accessToken=${data.accessToken}`;
    }else{
      document.cookie=`accessToken=`;
    }
    setTrigger((prevState)=>!prevState);
    

    return ok;
  };

  useEffect(()=>{
    //const authorized=document.cookie.split("=")[1];

    const accessToken= document.cookie.split("; ")[0];
    const authorized=accessToken.split("=")[1];
    
    setIsLoggedIn(Boolean(authorized));
  },[trigger]);

  return (
    <Context.Provider value={{isLoggedIn, setIsLoggedIn,trigger,setTrigger,refreshTokens}}>
        {children}
    </Context.Provider>
  );
};
