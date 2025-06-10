// src/lib/contentful.ts
import  contentful  from 'contentful';

export interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  environment?: string;
}

const contentfulConfig: ContentfulConfig = {
  spaceId: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master'
};

export const contentfulClient = contentful.createClient({
  space: contentfulConfig.spaceId,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment
});


export interface CourseReal {
  titulo: string;
  descripcion: string;
  horario:string;
  duracion:string;
  titulacion_obtenida: string;
  tipo: string;
  familia:string;
  en_que_te_formamos:string;
  puesto_a_desempenar:string;
  competencias:string;
  objetivos: string;
  salidas_laborales:string;
  acceso_otros_estudios:string;
  requisitos_acceso_ciclos_superiores:string;
  modulos_primer_curso:string;
  modulos_segundo_curso:string;

}
// Tipos para el contenido
export interface Course {
  title: string;
  description: string;
  duration: string;
  level: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  slug: string;
}

export interface NewsItem {
  title: string;
  excerpt: string;
  content: any; // Rich text content
  publishDate: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  slug: string;
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  aboutTitle: string;
  aboutContent: string;
}

// Funciones para obtener contenido
export async function getCourses(locale: string = 'es-ES'): Promise<Course[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'course',
      locale: locale
    });
    
    return response.items.map((item: any) => ({
      title: item.fields.title,
      description: item.fields.description,
      duration: item.fields.duration,
      level: item.fields.level,
      image: item.fields.image,
      slug: item.fields.slug
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getNews(locale: string = 'es-ES'): Promise<NewsItem[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'news',
      locale: locale,
      //order: '-fields.publishDate'
    });
    
    return response.items.map((item: any) => ({
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishDate: item.fields.publishDate,
      image: item.fields.image,
      slug: item.fields.slug
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getHomePage(locale: string = 'es-ES'): Promise<HomePage | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'homePage',
      locale: locale,
      limit: 1
    });
    
    if (response.items.length === 0) return null;
    
    const item = response.items[0] as any;
    return {
      heroTitle: item.fields.heroTitle,
      heroSubtitle: item.fields.heroSubtitle,
      heroImage: item.fields.heroImage,
      aboutTitle: item.fields.aboutTitle,
      aboutContent: item.fields.aboutContent
    };
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}