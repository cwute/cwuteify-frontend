# cwuteify. frontend

## Overview
Frontend for [cwuteify](https://cwute.dev). This is a simple web app that allows users to create playlists and add songs to them. Since registration form requires valid invite code, admin has complete control 
over who can register and use this app.

## Technical details
This project is built using following technologies:
 - [SvelteKit](https://kit.svelte.dev/) (using Node.js adapter)
 - [Vite](https://vitejs.dev/)
 - [TailwindCSS](https://tailwindcss.com/)
 - [PostCSS](https://postcss.org/)
 - [Prettier](https://prettier.io/)

This web app consumes [cwuteify backend](https://github.com/cwute/cwuteify-backend) API.

## Development
To run this project locally, you need to have Node.js installed. Then, run following commands:
```bash
npm install
npm run dev
```

## Deployment
To make a production build, run following command:
```bash
npm run build
```

You can then deploy the contents of `build` directory to your web server.

```
cd build
node .
```
## Usage
To find out more about using this web app, please refer to [user guide](/docs/user-guide.md).

## License
[MIT](/LICENSE)
