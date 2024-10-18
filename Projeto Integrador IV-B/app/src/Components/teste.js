import React, { useEffect } from 'react';

const Petfinder =()=>{
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.petfinder.com/assets/widgets/scripts/main-widgets-web.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <pet-scroller
          type="[]"
          age="[]"
          limit="24"
          status=""
          petlisttitle=""
          organization=""
          apibase="https://api.petfinder.com"
          petfinderurl="https://www.petfinder.com"
          accesstoken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJtd1NmUDQ1SEpPckFSS0RkVGM1M3JGSjNHVTJIdnk0SUxVSGR5Y3NnNGpURzRCVHIzdCIsImp0aSI6IjhocE9ZZ2JUSm9pWU9Xc08zRzh4cGVDT01uTUNwc2tWZlY5UEF5VkgiLCJpYXQiOjE3MjkyMjg4NDEsIm5iZiI6MTcyOTIyODg0MSwiZXhwIjo0ODg0OTAyNDQxLCJzdWIiOiIxNzgzMzU3MSIsInNjb3BlcyI6W119.SjH5_jK26fBu5d2mbjCHdydsGB5uf1g0zAdm6OxLZxdBKTG3hNCv2zm4xsUP1FKhZPUPEe793F6n47D1Xx7hZH8QnhgT0SQh3njyy8fnVEypqeS6GdMuBQaya5hB05Z88iCr-z2MEIVqXCxWlJZNa9LcwEqJzObQ93A1UmbhvefQoplMIat8A9nfN2IVhVjjC5fqiTpoSt1YGoV69r3W3ZVeo8ytTk1rIZ-tHDoXGHtVXFEPq4LnpxtuKtPaGaVTdu1UE_Ozh_Y06dctyLwy_2ny31H6ms_QqqLW_LpIJH2y-U5FTOLMebjKdTCKiPPpQ0DXUnuAvdpjHcdf5AvhBQ"
        />
      );
            
 }

 export default Petfinder;
 