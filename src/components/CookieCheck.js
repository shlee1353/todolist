import React, { useEffect } from 'react'

const CookieCheck = () => {

    useEffect(() => {
        var currentCookie = document.cookie;
        var cookieCheck = currentCookie.indexOf('ABC');
        
        if(cookieCheck > -1) {
            document.querySelector('.notice').style.display = 'none'
        } else {
            document.querySelector('.notice').style.display = 'block'
        }

        var date = new Date();
        date.setDate(date.getDate() + 7);
        var setCookie = '';
        setCookie += 'CookieName = ABC;';
        setCookie += 'expires =' + date.toUTCString();

        document.cookie = setCookie;
    }, [])

    const tempStyle = {
        position: "fixed",
        padding: "20px",
        border: "1px solid"
    }

    return (
        <div>
            <div className="notice" style={tempStyle}>notice</div>
        </div>
    )
}

export default CookieCheck
