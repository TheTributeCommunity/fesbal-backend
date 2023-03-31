<h1 align="center">
  FESBAL (BALPA) Backend
</h1>

# The Project🎯

The **goal** of this project is to help building a digital system for an NGO in Spain that distributes food to people in delicate situations.

Currently they carry out their operations with physical forms and manual processes, which causes great inefficiencies in the process and failures at the time of distribution. The organization relies on collaborating entities to distribute food to beneficiaries. These entities are in charge of receiving the food, identifying the beneficiaries and distributing the corresponding meals.
Our purpose is, on the one hand, to develop a web application for entities and beneficiaries. On the other hand, for the NGO the objective is to create a website where they can have a real time view of the operations.

There is a **huge opportunity** to improve the food access of many families in Spain and this could happen **thanks to your contribution.**

## Requirements 📋

1. Install [Node.js](https://nodejs.org/en) (v14.14 or higher)
  · Windows -> Run `choco install nodejs`
  · Linux -> Run `sudo apt install nodejs`
  · Mac -> Run `brew install nodejs`

2. Install [Booster CLI](https://docs.boosterframework.com/getting-started/installation#installing-the-booster-cli):
  · Run `npm install --global @boostercloud/cli`

## Project setup 🛠️

To start the booster backend locally, do the following:

1. Clone the repo
2. Run `npm install` inside the root folder of the app
3. Fill the fields inside the `.env.example` file, and rename it to `.env`. To get the data needed to fill this file, get in touch with one of the project managers;
4. Start the backend server with `boost start -e local`.

### Contributing

To contribute to the project, first read the [CONTRIBUTING.md](https://github.com/TheTributeCommunity/fesbal-backend/blob/main/CONTRIBUTING.md 'CONTRIBUTING.md') document.
It's also important to get in touch with the project managers to get the data to connect with Firebase and the S3 servers.

### Linting

Please **use eslint with the provided configuration**. To get it working in VSCode:

1. Install the ESLint extension extension (you can directly search for `dbaeumer.vscode-eslint`)
2. Configure VSCode to format on save. Add to your workspace VSCode settings (if the file doesn't exist then just create a new file `.vscode/settings.json` on the root directory of the project) the following:

```
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    },
}
```

### Getting started with Booster

Here are some useful links to start learning Booster:

- [What is Booster](https://www.boosterframework.com/)
- [Youtube playlist](https://www.youtube.com/watch?v=e5wQ3egAJeo&list=PLAS8tGIFYloQ6wxhWFIhIottLAsQds6Uw) with great small lessons to get started with booster. Made by Booster experts.
- [Booster demonstration videos](https://www.boosterframework.com/#demos)
- [Awesome documentation](https://docs.boosterframework.com/) with tutorials on each topic.
- [Discord Booster server](https://discord.gg/bDY8MKx) and [#booster-help channel](https://discord.com/channels/763753198388510780/1019895895325675550) where Booster experts are always available to answer questions.

## Work in progress 🚧
