import contentful, { type EntryFieldTypes } from "contentful";
export interface Cover2 {
  fields: {
    file: {
      contentType: string;
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
    title: string;
  };
}

export interface BlogPost {
  contentTypeId: "blogPost",
  fields: {
    title: EntryFieldTypes.Text
    content: EntryFieldTypes.RichText,
    date: EntryFieldTypes.Date,
    description: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    cover: EntryFieldTypes.AssetLink,
   // categories: contentful.EntryFieldTypes.Array<
   // contentful.EntryFieldTypes.EntryLink<CategoryEntrySkeleton>
  //>
    //categories: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CategorySkeleton>>,

    /*  cover: {
      fields: {
        file: {
          contentType: string;
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
      };
    },  */
    multimedia: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>,
  }
}

export interface PageBlogPost {
  contentTypeId: "pageBlogPost",
  fields: {
    title: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    content: EntryFieldTypes.RichText,
    publishedDate: EntryFieldTypes.Date,

  }
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});