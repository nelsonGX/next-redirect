# Next Redirect
This project is using Next.js's middleware to create a simple serverless 301 redirection service with Cloudflare Pages.  
example page: https://next-redirect.pages.dev/
## How to use
1. fork or else on your github/gitlab
2. go to cloudflare dashboard, create new pages project, connect the repo then deploy with next.js framework (note: you may have to add `nodejs_compat` Compatibility flags in the settings)
3. if you wish to use Google Tag Manager, please add NEXT_PUBLIC_GTM_ID environment variable
4. once it successfully deployed, you can start adding pages it will then automatically deploy. please edit `redirects.json` the file.
  
note that if title is not provided, it will just do a normal 301 redirect without the og tags.
