export class ScreenSize {

    /**
     * Gets the viewing window width
     * Call this within the OnInit
     */
    getWidth() {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width;
    }

    /**
     * Gets the viewing window height
     * Call this within the OnInit
     */
    getHeight() {
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return height;
    }

    isMobile() {
        if(/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) { 
            return true;
        } else {
            return false;
        }
    }
}