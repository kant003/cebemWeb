import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import contentful, { type EntryFieldTypes, type Entry, type Asset, type EntryFields, type EntrySkeletonType, type AssetLink } from "contentful";


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


//type NoticiaSkeleton = EntrySkeletonType<NoticiaFields, "noticia">;
//type Noticia = Entry<NoticiaSkeleton>;

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



/* 
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
 */
/* 
export interface NoticiaEntryType {
  contentTypeId: 'noticia';
  fields: {
    titulo:  EntryFieldTypes.Text;
    slug: string;
    fechaPublicacion: string;
    contenido: any;
    //autor?: string;
    //destacada?: boolean;
    portada?: AssetLink

      multimedia?: any;
  };
}
export type NoticiaEntry = Entry<NoticiaEntryType>;
 */


/* export interface NoticiaPlano {
  titulo: string;
  slug: string;
  fechaPublicacion: string;
  contenido: string;
  portada?: Asset;
  multimedia?: Asset[];
} */

// SOLUCIÓN: Define el tipo correctamente usando EntrySkeletonType
export interface NoticiaFields {
  titulo: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  fechaPublicacion: EntryFieldTypes.Date;
  contenido: EntryFieldTypes.RichText;
  portada?: EntryFieldTypes.AssetLink;
  multimedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type NoticiaSkeleton = EntrySkeletonType<NoticiaFields, 'noticia'>;
export type NoticiaEntry = Entry<NoticiaSkeleton>;


export async function getNoticias2(limit: number = 1,locale: string = 'es') : Promise<NoticiaEntry[]>{
  try {
    const response = await contentfulClient.getEntries<NoticiaSkeleton>({
      content_type: 'noticia', // Cambia por el ID de tu content type
      order: ['-fields.fechaPublicacion'],
      locale: locale,
      limit: limit
    });
    

    return response.items;
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return [];
  }
}


export async function getNoticiaBySlug(slug: string, locale: string = 'es') {
  try {
    const response = await contentfulClient.getEntries<NoticiaSkeleton>({
      content_type: 'noticia',
      'fields.slug': slug,
      locale: locale,
      limit: 1
    });
    
    return response.items[0] || null;
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return null;
  }
}


export async function getNoticiasDestacadas() {
  try {
    const response = await contentfulClient.getEntries<NoticiaSkeleton>({
      content_type: 'noticia',
      'fields.destacada': true,
      order: ['-fields.fechaPublicacion'],
      limit: 5
    });
    
    return response.items;
  } catch (error) {
    console.error('Error al obtener noticias destacadas:', error);
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

