# About cookies and host permissions
Chrome extensions documentation is not the best. This article make the topics of
host permissions and cookies a bit clear for me:
https://www.gmass.co/blog/send-cookie-cross-origin-xmlhttprequest-chrome-extension/

1. Host permissions we ask permissions to user for manipulating something on
   that host. Maybe don't needed for the API because we're going to do this via
   AJAX. No permission needed to update my own server lol.
2. Cookies permissions in `manifest.json` is not for passing cookies via AJAX.
   Is for interacting with the cookies of a site via Chrome's API
   `chrome.cookies`.
