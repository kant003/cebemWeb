import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import contentful, { type EntryFieldTypes, type Entry, type Asset, type EntryFields, type EntrySkeletonType } from "contentful";


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
  contentTypeId: "Noticia",
  fields: {
    titulo: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text,
    fechaPublicacion: EntryFieldTypes.Date,
    content: EntryFieldTypes.RichText,
    //description: EntryFieldTypes.Text,
    portada: EntryFieldTypes.AssetLink,
    multimedia: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>,

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
  }
}

/* export interface Noticia {
  contentTypeId: "Noticia",
  fields: {
    titulo: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text,
    fechaPublicacion: EntryFieldTypes.Date,
    content: EntryFieldTypes.RichText,
    //description: EntryFieldTypes.Text,
    portada: EntryFieldTypes.AssetLink,
    multimedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>,

   
  }
}
 */


export interface NoticiaFields {
  titulo: EntryFields.Text;
  slug: EntryFields.Text;
  fechaPublicacion: EntryFields.Date;
  contenido: EntryFields.RichText;
  portada: Asset;
  multimedia?: Asset[];
}

export interface NoticiaPlano {
  titulo: string;
  slug: string;
  fechaPublicacion: string;
  contenido: any;
  portada: any;
  multimedia?: any;
}

type NoticiaSkeleton = EntrySkeletonType<NoticiaFields, "noticia">;
type Noticia = Entry<NoticiaSkeleton>;

export interface PageBlogPost {
  contentTypeId: "pageBlogPost",
  fields: {
    title: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    content: EntryFieldTypes.RichText,
    publishedDate: EntryFieldTypes.Date,

  }
}


/* let cover : any;
let post: any;
let DEFAULT_URL_IMG = 'https://p.turbosquid.com/ts-thumb/VP/4zuDwr/8K8vxa7P/nyb/jpg/1309299891/600x600/fit_q87/da2fa3ed980c06fe6200bb0f5c68cd4c583d2b94/nyb.jpg'
  const data = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
    "fields.slug": slug,
    locale: lang,
  });

  const { title, date, content } = data.items[0].fields;
  post = {
    title,
    date: new Date(date).toLocaleDateString(),
    content: documentToHtmlString(content),
  };

  cover = data.items[0].fields.cover as Asset<undefined, string>;
 */




export async function getNoticiaBySlug(slug: string, locale: string = 'es'): Promise<NoticiaPlano | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'noticia',
      'fields.slug': slug,
      locale: locale,
    });

    if (response.items.length === 0) return null;

    const item = response.items[0] as any;
    return {
      titulo: item.fields.titulo || '',
      slug: item.fields.slug || '',
      fechaPublicacion: item.fields.fechaPublicacion,
      contenido:  documentToHtmlString(item.fields.contenido),
      portada: item.fields.portada,
      multimedia: item.fields.multimedia
      //locale: locale,
    };
  } catch (error) {
    console.error('Error fetching noticia:', error);
    return null;
  }
}

  


  export async function getNoticias(locale: string = 'es'): Promise<NoticiaPlano[]> {
    try {
      const response = await contentfulClient.getEntries({
        content_type: 'noticia',
        locale: locale,
        //order: '-fields.publishDate'
      });
      
      return response.items.map((item) => ({
        titulo: item.fields.titulo,
        slug: item.fields.slug,
        fechaPublicacion: item.fields.fechaPublicacion,
        contenido:  item.fields.contenido,
        portada: item.fields.portada,
      }));

      // return response.items;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
  
export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});