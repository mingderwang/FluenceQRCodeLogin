# FluenceQRCodeLogin
> refer to https://github.com/fluencelabs/examples/tree/main/quickstart/1-browser-to-browser
add Self.ID login for helloworld Fluence service

# Build and Run

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy to IPFS

```bash
npm run build
# or
yarn build

npm run ipfs
# or
yarn ipfs
```

example output
```
yarn run v1.22.11
$ node scripts/ipfs.js
🛰  Sending to IPFS...
📡 App deployed to IPFS with hash: QmT22xAiXCudX17sEcWyhyJkSULXKnQ3gvHkxzubeNAc1T

🚀 Deployment to IPFS complete!

Use the link below to access your app:
   IPFS: https://ipfs.infura.io/ipfs/QmT22xAiXCudX17sEcWyhyJkSULXKnQ3gvHkxzubeNAc1T

✨  Done in 14.39s.
```

## Getting Started

First, run the development server:

```bash
npm install
# or
yarn
```

```bash
npm run build
# or
yarn build
```

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
