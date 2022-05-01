# Hello and welcome to this course in Sanity and Next.js
## If you want to code along, please complete step 1 to 5 before the workshop.

> Enviroment requirements: 
> * node version 16.14.2 -> https://nodejs.org/dist/v16.14.2/node-v16.14.2.pkg 
> * vscode -> https://code.visualstudio.com/


### Step 1. Create an account and a project on Sanity

First, [create an account on Sanity](https://sanity.io).

After creating an account, install the Sanity cli from npm `npm i -g @sanity/cli`.

### Step 2. Create a new Sanity project

Clone the project.

In your terminal run `sanity login`, choose the same login option that i used creating your sanity account. 

In the studio folder run `sanity init` to initialize a new studio project. This will ask you to override the exisiting configuration, say `yes` to this. 

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



## Good job on coming this far, we will start on Step 6 live in Work-Work. So for now this is good!


### Step 6. Create a author schema in sanity

Reference to Sanity schema types: https://www.sanity.io/docs/schema-types


We don't have the options to add much content in our cms yet, let's fix that. 

First let's make a new file in our studio in the folder **/documents** under schemas, we will call it **author.ts** and add the following code: 

#### First we define the name, type, title and fields as an empty array

```ts
export default {
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    
  ],
}
```

> To be able to see our new schema we need to import it in our schema.ts file under types



#### We then add name object under field


```ts
{
  name: 'name',
  title: 'Name',
  type: 'string',
},
```

#### Finally we add a image object for our profile image


```ts
{
  name: 'picture',
  title: 'Picture',
  type: 'image',
},
```


### Step 7. Create a post schema in sanity

Let's make a post schema for our blog

Create a new file under the **/documents** folder called **post.ts**.

We start out defining the name, type, title and fields as an empty array

```ts
export default {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
      
  ],
};
```

> Remeber to import this file in the **schema.ts** file under types. 

#### Lets start by adding a title

```ts 
{
  name: "title",
  title: "Title",
  type: "string",
},
```

#### We will then add a slug that we can use for routing on our next.js app, we will also add a button to autogenerate the slug based on title
https://www.sanity.io/docs/slug-type

```ts
{
  name: "slug",
  title: "Slug",
  type: "slug",
  options: {
      source: "title",
  },
},
```

#### Our blog post need a content block, so lets add that
https://www.sanity.io/docs/block-type

```ts
{
  name: "content",
  title: "Content",
  type: "array",
  of: [{ type: "block" }],
},
```

#### We also want to entice our readers with a smooth cover photo. We shall also add the hotspot functionality 

```ts
{
  name: "coverImage",
  title: "Cover Image",
  type: "image",
  options: {
    hotspot: true
  }
},
```

> Now that we have our image, we don't always have to smoothest cover image on our computer. So lets add the unsplash plugin to easily get images for out blogpost. 

 #### Add a media plugins to the studio
 https://www.sanity.io/plugins/sanity-plugin-media
 https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash
 
 Add ``` "media"``` and ``` "asset-source-unsplash"``` to the plugin section in sanity.json and restart the studio from terminal


#### Our post needs to have a publish date

https://www.sanity.io/docs/datetime-type

```ts
{
  name: "date",
  title: "Date",
  type: "datetime",
},
```

#### And finally lets add an referance to who the author is. 

Here we are refering to the first author object we made.
https://www.sanity.io/docs/reference-type

```ts
{
  name: "author",
  title: "Author",
  type: "reference",
  to: [{ type: "author" }],
},
```

### Step 8. Add a desk structure and preview
https://www.sanity.io/docs/structure-builder-introduction

>When we do changes in this step we need to restart our studio build for every change. You stop the build with `cmd/ctrl + c`. 

We have startet on this for you in the `deskStructure.ts`file. But we need to let the studio know this exist, so in out **sanity.json** file we will add the following under the parts array.

```json
{
  "name": "part:@sanity/desk-tool/structure",
  "path": "./deskStructure.ts"
}
```

We will no longer see our posts and authors, because our deskStructur is an empty list. 
We fix this by adding a listItem. hehe

Inside the items array on line 27 of the deskStructure, add the following to the array: 

```ts
S.listItem()
  .title("Posts")
  .icon(MdChatBubble)
  .schemaType("post")
  .child(S.documentTypeList("post").title("Posts")),
```

Now that we see our post lets add the same for authors, add the following to the items array

```ts
S.listItem()
  .title("Authors")
  .icon(MdAccountCircle)
  .schemaType("author")
  .child(S.documentTypeList("author").title("Authors")),
```

When you go into a post now you can see that there is a new tab called preview. This is been added with the `getDefaultDocumentNode` function in the deskStructur. This is set up by us. You can read more about it here: https://www.sanity.io/docs/preview-content-on-site 



#### Now that we yet again can see out posts and authors, lets add a menu that sorts the posts by author
This is where we see the usefullness of the deskStructure

Add the following to items array:

```ts
 S.listItem()
   .title("Posts by author")
   .icon(MdGroup)
   .child(
     S.documentTypeList("author")
       .title("Posts by author")
       .child(
         (_id) =>
           S.documentList("post")
             .schemaType("post")
             .title("Posts by author")
             .filter('_type == "post" && author._ref == $_id')
             .params({ _id })
          )
      ),
```

> Between each `S.listItem()` in the array there is also possible to add a divider. Just add: `S.divider()`

Finally we need to add support for new schemas, so that we dont always have to add a listItem for each new schema we make. 

As the final item of our list items we destructure the rest of the documentTypeListItems

Add the following
```ts
  ...S.documentTypeListItems()
```


But now we get a dublicate of the author and post, and we don't need that. So lets filter those out.

Under our comments on line 7 and 8 in deskStructur.ts add the following function: 

```ts
const hiddenDocTypes = (listItem) => !["post", "author"].includes(listItem.getId());
```

Now we need to add our new function to our destructured function, update it like this:

```ts
  ...S.documentTypeListItems().filter(hiddenDocTypes),
```

### Step 9. Lets start building a Demo Page

We start out with making a new file under the documents folder called **demoPage.ts**

And add the following: 

```ts 
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
    fields: [
      
    ],
}
```

> Remember to add it to the types in the **schema.ts** file

#### Add a title to the document in the fields array

```ts
 {
   title: 'Title',
   name: 'title',
   type: 'string',
 }
```

#### We then need to add the slug for our page, with the option to autogenerate based on our title and have a max length of 200 characters. 

https://www.sanity.io/docs/slug-type
```ts
  {
  title: 'Slug',
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 200
  }
 },
 ```

 Since our slug is based on our title, we will add a conditional field to our slug. This will keep the slug field hidden in our ui until we have a title.  

 https://www.sanity.io/docs/conditional-fields

 Underneat type add the following: 
 
 ```ts
 hidden: ({document}) => !document?.title, 
 ```

 Our slug field will then look like this:

```ts
  {
  title: 'Slug',
  name: 'slug',
  type: 'slug',
  hidden: ({document}) => !document?.title,
  options: {
    source: 'title',
    maxLength: 200
  }
 },
 ```

 
 #### Add the published date field
 https://www.sanity.io/docs/datetime-type
 
 ```ts
{
  title: 'Publish Date',
  name: 'date',
  type: 'datetime',
},
 ```
 
 We can also add an initial value to the published date field
https://www.sanity.io/docs/initial-value-templates

Add the following under type: 

```ts
 initialValue: (new Date()).toISOString()
```

### Add a poster image field
https://www.sanity.io/docs/image-type

```ts
{
    title: 'Poster',
    name: 'poster',
    type: 'image',
    options: {
        hotspot: true
    },
},
```

But we did all this in our **post** schema, let's step it up abit. We will add a fields array to the poster. It will to string fields, one for caption and one for attribution. 

> Note: The caption field will have on extra property **options*, this allows the value to be shown in the ui. While **attribution** is only visible inside the image. 

```ts
fields: [
  {
    name: 'caption',
    type: 'string',
    title: 'Caption',
    options: {
      isHighlighted: true
    }
  },
  {
    name: 'attribution',
    type: 'string',
    title: 'Attribution',
  }
]
```

The poster filed will look like this: 

```ts
{
  title: 'Poster',
  name: 'poster',
  type: 'image',
  options: {
      hotspot: true
  },
  fields: [
      {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
              isHighlighted: true
          }
      },
      {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
      }
  ]
},
```
 
#### We want to referance to the author in this document aswell

```ts
{
  title: 'Author',
  name: 'author',
  type: 'reference',
  to: [{type: 'author'}]
},
```

#### But we can also referance to other documents, even multiple documents. So let's add that.
https://www.sanity.io/docs/array-type
https://www.sanity.io/docs/reference-type#f300c56f43d3

So instead of making a type referance, we will make a type array of type referance. 

Add the following code: 

```ts
{
  title: 'Multiple related posts',
  name: 'relatedPosts',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        {type: 'post'}
      ]
    }
  ]
},
```

#### Add portable text
https://www.sanity.io/docs/block-type

We also added the following code in our **post** schema. But we stopped there. In this we will add a bit more. 

Start by adding the following: 

```ts
{
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block'
    },
  ]
},
```


We will then add an image to the portable text. 
So inside the array add the following: 

```ts
{
  type: 'image',
  fields: [
    {
      type: 'text',
      name: 'alt',
      title: 'Alternative text',
      options: {
        isHighlighted: true
      }
    }
  ]
}
```

Our content field will the look like this: 

```ts
{
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
      {
          type: 'block'
      },
      {
          type: 'image',
          fields: [
              {
                  type: 'text',
                  name: 'alt',
                  title: 'Alternative text',
                  options: {
                      isHighlighted: true
                  }
              }
          ]
      }
  ]
},
```
 
 
#### Let's step it up and make a custom string
https://www.sanity.io/docs/custom-input-widgets

First we start by adding a new folder called **objects** under **schemas**. In this folder we make a new file called **CustomString.jsx**. 

To the file we add the following code: 

 ```ts
 import React from 'react'

// Import UI components from Sanity UI
import { TextInput, Stack, Label } from '@sanity/ui'

export const CustomString = React.forwardRef((props, ref) => {
    return (
      <Stack space={2}>
        <Label>{props.type.title} :D</Label>
        <TextInput value={props.value} />
      </Stack>
    )
  }
)

// Create the default export to import into our schema
export default CustomString
```

Now that we have our components, let use it in our demoPage schema. 

We first have to import our component at the top of the schema. 
So to the top of **demoPage.ts** add: 

```ts
import { CustomString } from "../objects/CustomString"
```

Then inside the fields array add the following: 

```ts
{
  name: 'customString',
  title: 'This is a cool custom string',
  type: 'string',
  inputComponent: CustomString
 },
 ```

#### With all the fields we have added so far, we have not put much limit on how much content can be put in each field. So let's add a input field that can only have 10 characters. 

Add the following: 

```ts
 {
   name: 'stringWithLimit',
   title: 'This is a string with validation',
   type: 'string',
   validation: Rule => Rule.max(10)
 },
```

#### Our demopage still only have a ugly folder as an icon, let's add en emoji instead. 
https://www.sanity.io/docs/icons-for-data-types

Above our fields array add the following:

``` icon: () => '🤩',```

#### Add a preview to the document type
https://www.sanity.io/docs/previews-list-views

We can also choose what we want to show as title, subtitle and media for each of our pages. Under the fields array, add the following: 

```ts
preview: {
  select: {
    title: 'title',
    subtitle: 'author.name',
    media: 'poster'
  }
}
```

This set's our page title, the authors name and poster. Sanity takes the title and first media element as default. So the only extra for us now is the author. 

> Task: Try to set the stringWithLimit as the title of the document and the media to the authors profile picture

#### The complete document should look like this

```ts
import { CustomString } from "../objects/CustomString"
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
    icon: () => '🤩',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            hidden: ({ document }) => !document?.title,
            options: {
                source: 'title',
                maxLength: 200
            }
        },
        {
            title: 'Poster',
            name: 'poster',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                    options: {
                        isHighlighted: true
                    }
                },
                {
                    name: 'attribution',
                    type: 'string',
                    title: 'Attribution',
                }
            ]
        },
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'author' }]
        },
        {
            title: 'Multiple related posts',
            name: 'relatedPosts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'post' }
                    ]
                }
            ]
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Alternative text',
                            options: {
                                isHighlighted: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'customString',
            title: 'This is a cool custom string',
            type: 'string',
            inputComponent: CustomString
        },
        {
            name: 'stringWithLimit',
            title: 'This is a string with validation',
            type: 'string',
            validation: Rule => Rule.max(10)
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'author.name',
            media: 'poster'
        }
    }
}
``` 

### Step 10. Get content from Sanity to front end
https://www.sanity.io/docs/how-queries-work

In a browser navigate to https://localhost:3000/dempPage/[slug]
Go to the Web/pages/demoPage/[slug].js. In getStaticProps the Sanity Client fetches data from Sanity. 
Open /Web/lib/queries.js. demoPageQuery uses GROQ to fetch data from Sanity

### Step 11. Deploy to vercel
https://vercel.com/guides/deploying-nextjs-with-vercel

- Go to Vercel account and click "New Project"
- import the project from Github.
- Skip "Create team"
- Choose web as root directory

Set up environment variables for
- SANITY_PREVIEW_SECRET 
- SANITY_API_TOKEN
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_SANITY_PROJECT_ID


## Congratulations on completing this Sanity intro course. Hope you learned something usefull. And we wish you good luck on your Sanity and Next.JS adventures!   














