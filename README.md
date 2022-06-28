# ExpenseTrackerApp
This is an Expense tracker application, with mordern UI and UX considerations, fuzzy search etc.

### FULLY CODED COMPONENTS

| HTML | React-Native |
| ---- | ------------ |

## Documentation

No official documentation issued as yet for the UI kit, currently in the works

## Architecture

A basic architecture diagram or description of the chosen architecture should be detailed here.



## File Structure/ Project Structure

Within the download you'll find the following directories and files:

```
ExpenseTrackerApp/
├── App.tsx
├── README.md
├── app.json
├── assets
├── babel.config.js
├── package.json
├── components
│   ├── _tests_
│   ├── buttons
│   ├── modals
│   ├── searchbar
│   ├── Editscreeninfo.tsx
│   ├── StyledText.tsx
│   ├── Themed.tsx
├── constants
│   ├── Colors.ts
│   ├── Layout.ts
│   ├── types.ts
│   │
├── hooks
│   ├── useCachedResources.ts
│   ├── useColorScheme.ts
│   │  
├── navigation
│   ├── index.tsx
│   
└── screens
│       ├── ExpenseAdditionScreen.tsx
│       ├── ExpenseAnalytics.tsx
│       ├── HomeScreen.tsx
│       ├── index.tsx
│       ├── NotFoundScreen.tsx
├── store
│   ├── ExenpenseProvider.tsx
├── utils
│   ├── theme.ts
    ├── validation.ts
│             
└── tsconfig.json
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node](https://nodejs.org/en/download/) minimum v12.18.0
- [Typescript](https://www.typescriptlang.org/download)
- [Expo CLI](https://github.com/angular/angular-cli](https://docs.expo.dev/workflow/expo-cli/) version 44 =>
- [Yarn](https://yarnpkg.com/) 
- Your preferred text editor or IDE

### Preferred package manager

The preferred package manager for this project is `yarn`

### Installing

- Clone the repository using SSH

```
git clone git@github.com:dantelentsoe/ExpenseTrackerApp.git


```

- Navigate to the cloned repo

```
cd ExpenseTrackerApp
```

- Install dependencies

```
yarn
```

- Run the server locally

```
yarn start 
```

## Running the tests

- To run tests normally, use

```
yarn test
```

### Detail testing methods

- To run tests with coverage reporting, use

```
yarn run coverage
```

- To run tests with coverage reporting and update snapshots, use

```
yarn run coverage:update
```

- For more testing scripts, have a look at the `scripts` section in the `package.json` file

## Environments

There are 1 environments each corresponding to a branch on the repository:

- Production - `master` branch


## Deployment

N/A

## Built With

Details of the tech stack that has been used.

- [Expo](https://expo.dev/) - The client framework used
- [React Native](https://reactnative.dev/) - The component library
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Native Base](https://nativebase.io/) - Mobile Styling Library


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/DanteLentsoe/Help-an-en-eye-gee-gee-ay) for details on the followed standards standard for commit messages and the accepted pull request process.

## Authors

- **Dante Lentsoe** <dllentsoe@gmail.com>

## Licenses

Results from `npx license-checker --summary`

```
├─ MIT: 953
├─ ISC: 78
├─ BSD-3-Clause: 37
├─ BSD-2-Clause: 29
├─ Apache-2.0: 26
├─ MIT*: 8
├─ BSD: 5
├─ (MIT OR CC0-1.0): 5
├─ CC0-1.0: 4
├─ WTFPL: 2
├─ Unlicense: 2
├─ 0BSD: 2
├─ Custom: https://github.com/tmcw/jsonlint: 1
├─ BSD-3-Clause OR MIT: 1
├─ (MIT OR Apache-2.0): 1
├─ CC-BY-4.0: 1
├─ Public Domain: 1
├─ AFLv2.1,BSD: 1
├─ (MIT AND Zlib): 1
├─ (MIT AND BSD-3-Clause): 1
└─ CC-BY-3.0: 1
```

## Troubleshooting

Here is a list of common errors and possible solutions:

Failed to push to Github due to out of date snapshots:

- Run

  > yarn test:update

- or
  > yarn coverage:update

## Meta

| Version | Author                              | Date       |
| ------- | ----------------------------------- | ---------- |
| 0.4.1   | Dante Lentsoe <dllentsoe@gmail.com> | 13/06/2022 |


<img width="366" alt="Screenshot 2022-05-31 at 11 50 00" src="https://user-images.githubusercontent.com/65385487/173329967-f9206c9f-ae86-4085-bbe7-1d2ed6e64828.png">
![Simulator Screen Shot - iPhone 12 - 2022-06-08 at 21 43 30](https://user-images.githubusercontent.com/65385487/173329989-2dd05fef-499b-482e-ae08-eaddd211faee.png)
![Simulator Screen Shot - iPhone 12 - 2022-06-08 at 21 43 38](https://user-images.githubusercontent.com/65385487/173329994-fa069cf3-748f-413d-8f1a-41f7ae9ff3d4.png)
![Simulator Screen Shot - iPhone 12 - 2022-06-08 at 21 44 31](https://user-images.githubusercontent.com/65385487/173329998-1d3d294f-8c82-47cf-b297-237605852742.png)
![Simulator Screen Shot - iPhone 12 - 2022-06-08 at 21 44 37](https://user-images.githubusercontent.com/65385487/173330002-8acd4d3c-fe20-4599-983f-48bf91bf4e2e.png)


