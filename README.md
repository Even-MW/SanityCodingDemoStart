# Hello and welcome to this cource in Sanity and Next.js
## If you want to code along, please complete step 1 to 5 before the workshop.

> Enviroment requirements: 
> * node version 16.14.2 -> https://nodejs.org/dist/v16.14.2/node-v16.14.2.pkg 
> * vscode -> https://code.visualstudio.com/


### Step 1. Create an account and a project on Sanity

First, [create an account on Sanity](https://sanity.io).

After creating an account, install the Sanity cli from npm `npm i -g @sanity/cli`.

### Step 2. Create a new Sanity project

Clone the project.

In the studio folder run `sanity init` to initialize a new studio project.

This will be where we manage our data.

When going through the init phase make sure to select **Yes** to the **Use the default dataset configuration** step and select **Clean project with no predefined schemas** for the **Select project template** step.

### Step 3. Generate an API token

Log into https://manage.sanity.io/ and choose the project you just created. Then from **Settings**, select **API**, then click **Add New Token** and create a token with the **Read** permission.

### Step 4. Set up environment variables in the web folder

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` should be the `projectId` value from the `sanity.json` file created in step 2.
- `NEXT_PUBLIC_SANITY_DATASET` should be the `dataset` value from the `sanity.json` file created in step 2 - defaults to `production` if not set.
- `SANITY_API_TOKEN` should be the API token generated in the previous step.
- `SANITY_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

Your `.env.local` file should look like this:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_TOKEN=...
SANITY_PREVIEW_SECRET=...
```




### Step 5. Run Next.js and Saniy in development mode

To run sanity, in the **studio** folder run the following:

```bash
npm start

```

To run next.js, in the **web** folder run the following: 

```bash
npm install
npm run dev
```


> You should now have a simple next.js application up and running, not much content yet. But we will fix that in the live course. 
> You should also have an empty sanity project up a running. 



## Good job on coming this far, we will start on Step 6 live in work work. So for now this is good!


### Step 6. Create a author schema in sanity

We don't have the options to add much content in our cms yet, let's fix that. 

First let's make a new file in our studio in the folder **/documents** under schemas, we will call it **author** and add the following code: 

* First we define the name, type and title

```
export default {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
      
    ],
  }
```

 * We then add name object under field


```
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
```

* Finally we add a image object for our profile image


```
      {
        name: 'picture',
        title: 'Picture',
        type: 'image',
      },
```





