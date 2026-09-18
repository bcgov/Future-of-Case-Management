import { sveltekit } from '@sveltejs/kit/vite';

// Public OIDC configuration, baked in at build time. Unset means the sign-in
// curtain is inert and the site is open, which is how it builds locally.
const define = {
  __OIDC_ISSUER__: JSON.stringify(process.env.PUBLIC_OIDC_ISSUER ?? ''),
  __OIDC_CLIENT_ID__: JSON.stringify(process.env.PUBLIC_OIDC_CLIENT_ID ?? ''),
  __OIDC_IDP_HINT__: JSON.stringify(process.env.PUBLIC_OIDC_IDP_HINT ?? 'idir')
};

export default {
  plugins: [sveltekit()],
  define
};
