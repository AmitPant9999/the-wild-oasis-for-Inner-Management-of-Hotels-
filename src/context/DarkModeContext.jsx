import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext=createContext();
function DarkModeProvider({children}){
    const [isDarkMode,setIsDarkMode]=useLocalStorageState(window.matchMedia("(prefers-colors-scheme: dark)"),"isDarkMode");

    useEffect(function(){
        if(isDarkMode){
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        
        }
        else{
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");

        }
    })
    function toggleDarkMode(){
        setIsDarkMode((isDark)=>!isDark);
    }

    return <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>

}

function useDarkMode(){
    const context=useContext(DarkModeContext);
    if(context===undefined) 
        throw new Error("context is used outside the provider");
    return context;
};
export {useDarkMode,DarkModeProvider};