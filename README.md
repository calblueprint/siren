# SIREN

## Getting Started

1. Check your Node version with `node -v` (must be at least 12)
2. Install expo globally, if not already `npm install --global expo-cli`
3. Clone the repo `git clone [link]`
4. `cd siren`
5. Test the app by running `expo start`

## Adding Environment Variables

1. Create a `.env` file in the root directory and define necessary variables
2. Add an export statement for new variables in `/types/env.d.ts`
3. Usage example: `import { var1, var2 } from '@env';`