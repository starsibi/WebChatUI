function isSet(value) {
    if ((value != undefined) && (value != null) && (value != "") && (value != "undefined") && (value != "null")) {
        return true;
    } else {
        return false;
    }
}

$(function () {
    var IsAuthorisedUser = isSet(sessionStorage.getItem("UserProfileGoogle"));
    if (!IsAuthorisedUser) {
        window.location.pathname = "index.html";
    } else {
        $("#toggle").prop("checked", true);
    }
});

$("#toggle").click(function () {
    if (!$(this).prop("checked")) {
        sessionStorage.removeItem("UserProfileGoogle");
        sessionStorage.removeItem("UserLastName");
        sessionStorage.removeItem("UserEmailId");
        sessionStorage.removeItem("UserFirstName");
        sessionStorage.removeItem("UserAvatar");
        window.location.pathname = "index.html";
    }
});
(async function () {

    var UserEmail = sessionStorage.getItem("UserEmailId");
    var UserAvatar = sessionStorage.getItem("UserAvatar");
    var UserFirstName = sessionStorage.getItem("UserFirstName");
    var UserLastName = sessionStorage.getItem("UserLastName");

    const styleOptions = {
        backgroundColor: '#83BB00',

        botAvatarImage: './Images/logo_saggezza.png',
        botAvatarInitials: 'SG',
        userAvatarImage: UserAvatar,
        userAvatarInitials: '',

        // Send box
        hideSendBox: false,
        hideUploadButton: true,
        microphoneButtonColorOnDictate: '#F33',
        sendBoxBackground: 'rgba(0, 0, 0, 0.3)',
        sendBoxButtonColor: '#fff',
        sendBoxButtonColorOnDisabled: '#ccc',
        sendBoxButtonColorOnFocus: '#fff',
        sendBoxButtonColorOnHover: '#333',
        sendBoxHeight: 40,
        sendBoxMaxHeight: 200,
        sendBoxTextColor: 'White',
        sendBoxBorderBottom: '',
        sendBoxBorderLeft: '',
        sendBoxBorderRight: '',
        sendBoxBorderTop: 'none',
        sendBoxPlaceholderColor: '#fff',
        sendBoxTextWrap: false,
    };


    // We are adding a new middleware to customize the behavior of DIRECT_LINE/POST_ACTIVITY.
    const store = window.WebChat.createStore(
        {},
        ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/POST_ACTIVITY') {
                // The channelData submitted here is very similar to HTTP cookies and vulnerable to forgery attack.
                // Make sure you use signature to protect it and verify the signature on the bot side.

                // To minimize unexpected behaviors, we recommend to treat the "action" object as if it is immutable.
                // We use simple-update-in package to update "action" with partial deep cloning.
                action = window.simpleUpdateIn(action, ['payload', 'activity', 'channelData', 'email'], () => UserEmail);
                action = window.simpleUpdateIn(action, ['payload', 'activity', 'channelData', 'firstName'], () => UserFirstName);
                action = window.simpleUpdateIn(action, ['payload', 'activity', 'channelData', 'lastName'], () => UserLastName);
            }
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {                
                dispatch({
                    type: 'WEB_CHAT/SEND_EVENT',
                    payload: {
                        name: 'webchat/join',
                        value: { language: "Prithvi-Rama" }
                    }
                });
            }
            return next(action);
        }
    );

    window.WebChat.renderWebChat({
        directLine: window.WebChat.createDirectLine({ token: 'Bg_uf1m3oOI.LqD3ef0uTHmollzaeZWXLXwurzrT6ISTP2Kj_Y63wII' }),
        store,
        styleOptions,

    }, document.getElementById('webchat'));



    document.querySelector('#webchat > *').focus();
})().catch(err => console.error(err));