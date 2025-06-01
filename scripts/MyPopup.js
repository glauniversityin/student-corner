function openMyPayPopUp(popUrl, w, h) {
    var width = 0;
    var height = 0;
    var left = 0;
    var top = 0;
    if (w == 0) {
        width = screen.width;
        height = screen.height;
        left = 0;
        top = 0;
    }
    else {
        width = w;
        height = h;
        left = (screen.width - width) / 2;
        top = (screen.height - height) / 2;
    }
    var params = 'width=' + width + ', height=' + height;

    params += ', top=' + top + ', left=' + left;

    params += ', directories=no';

    params += ', fullscreen=no';

    params += ', addressbar = no';

    params += ', location=no';

    params += ', menubar=no';

    params += ', resizable=no';

    params += ', scrollbars=yes';

    params += ', titlebar = no';

    params += ', status=no';

    params += ', toolbar=no';

    var openWindow = window.open(popUrl, generateUUID(), params);
    if (openWindow == null || typeof (openWindow) == 'undefined') {
        alert('Your Browser`s Popup is block. Please Allow/Unblock Your Pop-Up From Browser`s Setting To Open This Link....');
    }
    else {
        //window.location = "RedirectRequest.aspx?Type=FeeProcessing";
        //openWindow.focus();
    }

}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid.toUpperCase();
}
function openMyPopUpFix(popUrl, w, h, nm) {

    var width = 0;
    var height = 0;
    var left = 0;
    var top = 0;
    if (w == 0) {
        width = screen.width;
        height = screen.height;
        left = 0;
        top = 0;
    }
    else {
        width = w;
        height = h;
        left = (screen.width - width) / 2;
        top = (screen.height - height) / 2;
    }
    var params = 'width=' + width + ', height=' + height;

    params += ', top=' + top + ', left=' + left;

    params += ', directories=no';

    params += ', fullscreen=no';

    params += ', addressbar = no';

    params += ', location=no';

    params += ', menubar=no';

    params += ', resizable=no';

    params += ', scrollbars=yes';

    params += ', titlebar = no';

    params += ', status=no';

    params += ', toolbar=no';


    var openWindow = window.open(popUrl, nm, params);
    if (openWindow == null || typeof (openWindow) == 'undefined') {
        alert('Your Browser`s Popup is block. Please Allow/Unblock Your Pop-Up From Browser`s Setting To Open This Link....');
    }
    else {
        openWindow.focus();
    }

}