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

We have startet on this for you in the `deskStructure.ts`file. But we need to let the studio know this exist, so in out **sanity.json**q file we will add the following under the parts array.

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

We start out with making a new file under the documents folder called `demoPage.ts``

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

#### Add a title to the document in the fields array

```ts
 {
   title: 'Title',
   name: 'title',
   type: 'string,
 }
```

#### Add the proprty for slug
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
 #### Add the conditional hidden field to the slug. When no title is present the slug should be hidden
 https://www.sanity.io/docs/conditional-fields
 
 ```hidden: ({document}) => !document?.title, ```
 
 #### Add the published date field
 https://www.sanity.io/docs/datetime-type
 
 ```ts
{
  title: 'Publish Date',
  name: 'date',
  type: 'datetime',
},
 ```
 
 #### Add an initial value to the published date field
https://www.sanity.io/docs/initial-value-templates

``` initialValue: (new Date()).toISOString()```

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
#### Add additional fields to the image property

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
 
#### Add a reference to the author document type

```ts
{
  title: 'Author',
  name: 'author',
  type: 'reference',
  to: [{type: 'author'}]
},
```

#### Add references to multiple post documents
https://www.sanity.io/docs/array-type
https://www.sanity.io/docs/reference-type#f300c56f43d3

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

#### Add an image to the portable text
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

#### Add a YouTube video to the portable text

```ts
 {
   type: 'youtube'
 },
```

Create a youtube object type

```ts
import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTubefilm',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    },
    {
      name: 'videoLabel',
      type: 'string',
      title: 'Descriptive video title'
    }
  ],
  preview: {
  	select: {
  		url: 'url'
  	},
  	component: Preview
  }
}
```

Add the following Youtube video to the document: https://www.youtube.com/watch?v=2ceM_tSus_M&t=5s

#### Add a location property
https://www.sanity.io/docs/geopoint-type

```ts
{
  title: 'Location',
  name: 'location',
  type: 'geopoint'
 },
 ```
 
 #### Add a map plugin to the studio
 https://www.sanity.io/plugins/sanity-plugin-leaflet-input
 
 Add ``` "leaflet-input"``` to the plugin section in sanity.json and restart the studio from terminal
 
#### Add a custom string
https://www.sanity.io/docs/custom-input-widgets

```ts
{
  name: 'customString',
  title: 'This is a cool custom string',
  type: 'string',
  inputComponent: CustomString
 },
 ```
 
 Create a custom string object type
 ```ts
 import React from 'react'

// Import UI components from Sanity UI
import { TextInput, Stack, Label } from '@sanity/ui'

export const CustomString = React.forwardRef((props, ref) => {
    return (
      <Stack space={2}>
        <Label>{props.type.title}</Label>
        <TextInput value={props.value} />
      </Stack>
    )
  }
)

// Create the default export to import into our schema
export default CustomString
```

#### Add a string with validation
```ts
 {
   name: 'stringWithLimit',
   title: 'This is a string with validation',
   type: 'string',
   validation: Rule => Rule.max(10)
 },
```

#### Add a custom validation to the string

```inputComponent: StringWithLimits,```

add the custom input object type

```ts
import React from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput, Stack, Text } from '@sanity/ui'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from "@reach/auto-id" // hook to generate unique IDs

const StringWithLimits = React.forwardRef((props, ref) => {
  const { 
      type,         // Schema information
      value,        // Current field value
      readOnly,     // Boolean if field is not editable
      placeholder,  // Placeholder text from the schema
      markers,      // Markers including validation rules
      presence,     // Presence information for collaborative avatars
      compareValue, // Value to check for "edited" functionality
      onFocus,      // Method to handle focus state
      onBlur,       // Method to handle blur state  
      onChange      // Method to handle patch events
    } = props
    
    // Creates a unique ID for our input
    const inputId = useId()
    
    const MaxConstraint = type.validation[0]._rules.filter(rule => rule.flag == 'max')[0].constraint


    const handleChange = React.useCallback(
      (event) => {
        const inputValue = event.currentTarget.value
        onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
      },
      [onChange]
    )
    return (
      <Stack space={1}>

      <FormField
        description={type.description}  // Creates description from schema
        title={type.title}              // Creates label from schema title
        __unstable_markers={markers}    // Handles all markers including validation
        __unstable_presence={presence}  // Handles presence avatars
        compareValue={compareValue}     // Handles "edited" status
        inputId={inputId}               // Allows the label to connect to the input field
      >
        <TextInput
          id={inputId}                  // A unique ID for this input
          onChange={handleChange}       // A function to call when the input value changes
          
          value={value}                 // Current field value
          readOnly={readOnly}           // If "readOnly" is defined make this field read only
          placeholder={placeholder}     // If placeholder is defined, display placeholder text
          onFocus={onFocus}             // Handles focus events
          onBlur={onBlur}               // Handles blur events
          ref={ref}
        />
        </FormField>
        <Text style={{color: (value ? value.length : 0) > MaxConstraint ? 'red' : 'green'}} muted size={1}>{value ? value.length : '0'} / {MaxConstraint}</Text>
      </Stack>
    )
  }
)

export default StringWithLimits
```
#### Add an icon to the document type
https://www.sanity.io/docs/icons-for-data-types

``` icon: () => '🤩',```

#### Add a preview to the document type
https://www.sanity.io/docs/previews-list-views

```ts
preview: {
  select: {
    title: 'title',
    subtitle: 'author.name',
    media: 'poster'
  }
}
```

#### The complete document should look like this

```ts
import CustomString from "../objects/customString"
import StringWithLimits from "../objects/StringWithLimits"
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
    icon: () => '🤩',
    fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
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
        {
          title: 'Publish Date',
          name: 'date',
          type: 'datetime',
          initialValue: (new Date()).toISOString()
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
          to: [{type: 'author'}]
        },
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
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            {
              type: 'youtube'
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
          title: 'Location',
          name: 'location',
          type: 'geopoint'
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
          inputComponent: StringWithLimits,
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


### Step 10. Add a dashboard to the studio
https://www.sanity.io/docs/dashboard

#### Enable dashboards
Add ```{
      "implements": "part:@sanity/dashboard/config",
      "path": "./dashboardConfig.js"
    },``` to the parts list and ``` "@sanity/dashboard",```to the plugins list in sanity.json 

Create the dashboardConfig.js

``` 
export default {
  widgets: [
   
    {name: 'structure-menu'},
    {name: 'project-users', layout: {height: 'auto', widht:'medium'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
```
And finally restart the studio from terminal

#### Add a widget to the dashboard
https://www.sanity.io/docs/creating-your-own-widget

Run ```sanity init plugin```in the studio folder and choose "A Dashboard with cats" and accept all default values
Add ``` {name: 'cats',  layout: {width: 'full'}},``` to dashboardConfig.js

### Step 11. Change the UI of Sanity Studio
https://www.sanity.io/docs/styling
https://www.sanity.io/plugins/sanity-plugin-hotdog-stand

From the studio folder run ```sanity install hotdog-stand``` and restart the studio from terminal

### Step 12. Get content from Sanity to front end
https://www.sanity.io/docs/how-queries-work

In a browser navigate to https://localhost:3000/dempPage/[slug]
Go to the Web/pages/demoPage/[slug].js. In getStaticProps the Sanity Client fetches data from Sanity. 
Open /Web/lib/queries.js. demoPageQuery uses GROQ to fetch data from Sanity

### Step 13. Deploy to vercel
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





















