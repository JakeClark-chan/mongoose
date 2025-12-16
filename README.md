# ESlint config

## Setup

1. Install the dependencies
```
npm i -D eslint
```

If you ever have an eslint dependency installed, you can just install it directly
```
npm i -D eslint-config-ms
```

2. Create a `.eslintrc.json` file extending the config:
```
{
  "extends": "eslint-config-ms/nextjs"
  // "extends": "eslint-config-ms/react"
}
```
