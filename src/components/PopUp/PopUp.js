import React, { useEffect } from 'react'

const PopUp = () => {

    // 쿠키
    // useEffect(() => {
    //     var currentCookie = document.cookie;
    //     var cookieCheck = currentCookie.indexOf('ABC');
        
    //     if(cookieCheck > -1) {
    //         document.querySelector('.notice').style.display = 'none'
    //     } else {
    //         document.querySelector('.notice').style.display = 'block'
    //     }

    //     var date = new Date();
    //     date.setDate(date.getDate() + 7);
    //     var setCookie = '';
    //     setCookie += 'CookieName = ABC;';
    //     setCookie += 'expires =' + date.toUTCString();

    //     document.cookie = setCookie;
    // }, [])

    // 로컬스토리지
    useEffect(() => {
        var displayDate = new Date();
        var str = localStorage.getItem("displayDate");
        var compareDate = new Date(str);

        if(str == undefined || str == null || compareDate.getTime()  <= displayDate.getTime()){
            document.querySelector('.notice').style.display = 'none'
        } else {
            document.querySelector('.notice').style.display = 'block'
        }

        var displayDate = new Date();
        displayDate.setDate(displayDate.getDate() + 2);
        localStorage.setItem("displayDate", displayDate);
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

export default PopUp
