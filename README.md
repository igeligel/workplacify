# workplacify

The open-source desk scheduling app for your office. [Learn more](https://workplacify.com).

<div align="center">

[Discord](https://discord.gg/m6EQptpj) · [Website](https://workplacify.com) · [Issues](https://github.com/igeligel/workplacify/issues)

</div>

## About the Project

We are the first open-source desk scheduling app for your office. Ever had conflicting desk schedules or an employee not getting their favorite desk? Tracking your desks in an Excel sheet? Use workplacify to manage your office desks and make your employees happy. A perfect alternative to Envoy, UnSpot, or desk.ly.

### Built With

- [Next.js](https://nextjs.org/?ref=workplacify.com)
- [tRPC](https://trpc.io/?ref=workplacify.com)
- [React.js](https://reactjs.org/?ref=workplacify.com)
- [Chakra UI](https://chakra-ui.com/?ref=workplacify.com)
- [Prisma](https://prisma.io/?ref=workplacify.com)

## Contact us

Meet us on [Discord](https://discord.gg/m6EQptpj) or [schedule a meeting](https://calendar.app.google/8pcg6kcqXvuyVPyq8) with the founder.

## Development

### Setup

1. Fork the repository: https://github.com/igeligel/workplacify/fork and clone it to your local machine:
   ```sh
   git clone https://github.com/<your_username>/workplacify
   ```
1. Go to the project directory:
   ```sh
   cd workplacify
   ```
1. Install packages with npm
   ```sh
   npm install
   ```
1. Set up your `.env` file:
   - Duplicate `.env.example` to `.env`
   - Create a new `NEXTAUTH_SECRET`, for example via: https://bitwarden.com/password-generator/
   - Generate the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` via https://console.cloud.google.com/apis/credentials
   - Generate the `CLOUDINARY_API_SECRET`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_NAME` via https://cloudinary.com/console
1. Setup Node If your Node version does not meet the project's requirements as instructed by the docs, "[nvm](https://github.com/nvm-sh/nvm)" (Node Version Manager) allows using Node at the version required by the project. You can also use [nvm-windows](https://github.com/coreybutler/nvm-windows). We are currently using Node.js 20.
1. Start the database & development server:
   ```sh
   npm run db-up
   npm run dx
   ```
1. Once starting you also should see an example organization id which you can join which has some static data already.

## Deployment

Deployment is done via [render.com](https://render.com). You can deploy your own instance by clicking the button below:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Contributing

We are still working on our contributing guide but feel free to open a PR or issue if you see something or want to request a feature.

### Hacktoberfest

We will be active maintainers during the [Hacktoberfest](https://hacktoberfest.com/). In 2024 we will focus on this.

## Integrations

We are having some integrations of which some are necessary to run the application.

### Google OAuth

We use Google as the main auth provider. You can create your own OAuth credentials via https://console.cloud.google.com/apis/credentials. These credential can be then added to the `.env` file.

### Cloudinary

We are using cloudinary to save images of the floor. We currently do not have other providers to save the image, but we might work on this in the future. You can create your own Cloudinary credentials via https://cloudinary.com/console. These credential can be then added to the `.env` file.

### Discord (for notifications)

Discord is fully optional but we use it to notify the team around issues, or events that are happening on the platform, to interact with new users for example. You can create your own Discord bot via https://discord.com/developers/applications. These credential can be then added to the `.env` file.

## License

The code is licensed under the [MIT License](./LICENSE) mostly. Some parts are currently licensed under different licenses because they are commercial projects:

- Chakra Starter: [PolyForm Strict License 1.0.0](./src/chakra-starter/LICENSE.MD)

## Acknowledgements

None so far!
