
export class Cookie{
    
    /* CookieManager.js | v1.1.2
    * An incredibly simple and lightweight library for adding, fetching, modifying, and removing browser cookies with vanilla JS.
    * https://github.com/Gigabyte5671/CookieManager
    */

    set(cookieName, cookieValue, cookieLifespan){
        let d = new Date();
        d.setTime(d.getTime() + (cookieLifespan * 24 * 60 * 60 * 1000)); // Set the cookie expiration time (cookieLifespan is in days).
        let expires = d.toUTCString();
        return document.cookie = `${cookieName}=${cookieValue};expires=${expires};path=/;SameSite=Strict;`;
    }

    get(cookieName){
        let name = `${cookieName}=`;
        let cookieArray = document.cookie.split(';'); // Split the document's cookie string into an array.
        for(let i = 0; i < cookieArray.length; i++){ // For every cookie in the array.
            let cookie = cookieArray[i];
            while(cookie.charAt(0) == ' '){ // Remove any space from the start of the cookie name.
                cookie = cookie.substring(1);
            }
            if(cookie.indexOf(name) == 0){
                return cookie.substring(name.length, cookie.length); // Return the value of the cookie.
            }
        }
        return false; // Return false if there were no matching cookies.
    }

    check(cookieName){
        return !!cookieName && document.cookie.includes(`${cookieName}=`); // Return true if the requested cookie name exists in the document.
    }

    clear(cookieName){
        this.set(cookieName, "", -1); // Cause the browser to remove the cookie by setting its expiration to a date in the past.
    }


}