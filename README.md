# [PH-lvl2-assignment-2-Server](https://lvl2-assignment-2.vercel.app/)

## Run

- developement `npm run dev` -> "dev": "tsnd --respawn ./src/server.ts"
- build `npm run build` -> "build": "tsc",
- start the server `npm run start` -> "start": "node ./dist/server.js"

## Uses ->

- An user can create account for him/her
- An user can Read account of him/her
- An user can Update account for him/her
- An user can Delete account for him/her
- Basically i implemented in crud opperation here.
- And also i can get all user necessary information

## used technology

- I choosed moduler patter to create my backed
- I used -> Express (powerful node.js fremwork to create server)
- -> mongoose (mongodb fremwork for access database securly)
- -> TypeScript (A super set of javaScript to type declaration)
- -> eslint + prettier (To organize code and follow the best practices )
- -> Zod (for validation)
- -> dotEnv (Enviroment varriable to keep safe sensative data)
