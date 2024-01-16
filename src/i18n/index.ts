import es from './es.json';
import gl from './gl.json';
const LANGUAGES = {
    es: 'es',
    gl: 'gl'
};

export const getI18N = ({currentLocale = 'es'}: {currentLocale: string}) => {
    if(currentLocale === LANGUAGES.es) return es
    if(currentLocale === LANGUAGES.gl) return gl
    
}
