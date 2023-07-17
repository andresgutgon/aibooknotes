## Why we need SSL in development?
So Chrome extensions content scripts require your server 2 security measures in
orther to be able to make request to your server from other web pages from your
[content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
1. Configure CORS and allow those website to make requests againts your server.
   In this case these sites are all Kindle online domains.
2. Make NextJS Auth to write session cookie as [sameSite=none](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
About `sameSite=None`
> means that the browser sends the cookie with both cross-site and same-site requests. The Secure attribute must also be set when setting this value, like so SameSite=None; Secure.

So secure means your server needs to use `https`. And here we're setting SSL on
our local development nextjs app to write the next-auth session cookie as
`sameSite=None` and be able to read that cookie from the Chrome extension.

### Note about security
[NextAuth docs](https://next-auth.js.org/configuration/options#cookies)
recommends not to override the cookie configuration. But I don't see other way
of achiving what I want. I don't know how this config can be insecure if the
goal of my app is to allow cross-site sessions between domains. Specially having
cors correctly configured and only allowing some specific sites to read cookies
session.

> Using a custom cookie policy may introduce security flaws into your application and is intended as an option for advanced users who understand the implications. Using this option is not recommended.

I would change this warning for a more informative note on how to securely
configure a site for use `sameSite=None`. Even I would add an option to pass
this setting and do not need to override all the cookie.

## How to setup SSL in development?
The answer is using [mkcert](https://github.com/FiloSottile/mkcert) + [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy)

`mkcert`: This is tool for generating a local SSL certificate and tell your
machine to trust it. It makes things super easy. If something is not clear after
reading this README read the readme on their repo.
`local-ssl-proxy`: I could setup a traefik/nginx in a docker compose as reverse
proxy for the nextjs app but I want to be able to debug and I feel that would
complicate debugging node server. Specially from the editor.

### SSL in Development with mkcert
This is here to explain how to enable SSL while developing in your machine.
For generating the SSL certificate locally use [mkcert](https://github.com/FiloSottile/mkcert) (It can be installed with Homebrew in Mac OSX).

Run this:
```
cd ~/code/apps/web/ssl/certificates
mkcert localhost
```

Now you have to start your NextJS dev server normally:
```
pnpm dev
```

And on other terminal the https proxy:
```
pnpm ssl
```

Now you should put in your `.env` file this for Next Auth:
```
NEXTAUTH_URL='https://localhost:3001'
```
So we're telling NextJS auth that our app domain is the domain of the SSL local
proxy. Not the real NextJS domain `http://localhost:3000`. You can see this
config in `./ssl/config.json`



# Articles

### About cookies and host permissions
Chrome extensions documentation is not the best. This article make the topics of
host permissions and cookies a bit clear for me:
https://www.gmass.co/blog/send-cookie-cross-origin-xmlhttprequest-chrome-extension/

1. Host permissions we ask permissions to user for manipulating something on
   that host. Maybe don't needed for the API because we're going to do this via
   AJAX. No permission needed to update my own server lol.
2. Cookies permissions in `manifest.json` is not for passing cookies via AJAX.
   Is for interacting with the cookies of a site via Chrome's API
   `chrome.cookies`.
