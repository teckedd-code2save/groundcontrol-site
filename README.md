# GroundControl Site

The public GroundControl product and installation site. It is intentionally
separate from the private GroundControl console.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run vercel-build
```

The Vercel build produces a statically prerendered `/` route. The page has no
authentication or dashboard link; its primary action is the VPS installer.

## Deploy on Vercel

1. Import this repository as a new Vercel project.
2. Keep the detected framework as **Next.js**.
3. Deploy without environment variables.
4. Add `groundcontrol.serendepify.com` to the Vercel project only when the
   current site is ready to be replaced.

The private application remains at
`console.groundcontrol.serendepify.com`; its GitHub callback and webhook URLs
must use that console hostname.
