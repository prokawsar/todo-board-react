## Todo Board

## Demo

You can view a fully working demo at [https://todo-board-react.vercel.app/](https://todo-board-react.vercel.app/).

Demo credentials

email: kawsariam@gmail.com

password: 123456

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new).

   For using existing created database, secrets for `.env` are shared in the email.

2. Clone this repo command

   ```bash
   git clone https://github.com/prokawsar/todo-board-react.git
   ```

3. Use `cd` to change into the app's directory and install dependencies

   ```bash
   cd todo-board-react
   npm i
   ```

4. Rename `.env.local.example` to `.env` and update the following:

   ```
   REACT_APP_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   REACT_APP_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

5. You can now run the Next.js local development server:

   ```bash
   npm run start
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).
