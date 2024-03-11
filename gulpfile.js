const { src, dest, watch, parallel} = require('gulp'); //Entonces, src sirve para identificar un archivo y dest sirve para guardarlo.

// CSS
const sass = require("gulp-sass")(require('sass')); // Manda a llamar la función SASS
const plumber = require('gulp-plumber'); // Instalamos la dependencia, extraemos la variable y la podemos utilizar

function css(done){

    // Identificar el archivo SASS
    // Compilarlo
    // Almacenarla en el disco duro

    src('src/scss/**/*.scss') //Toma la ubicación de donde está el archivo
        .pipe( plumber())
        .pipe( sass() ) // Le aplica SASS
        .pipe(dest('build/css')) // Lo guarda en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución.
}

async function versionWebp(done) {
     
    const webp = await import("gulp-webp"); // Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal"
 
 
    const opciones = {
        quality: 50 // Esto define que tanta calidad se le bajarán a las imágenes
    }
 
    src('src/img/**/*.{png,PNG,jpg,JPG}') // Busca recursivamente en todos los archivos y carpetas de la carpeta img con los formatos especificados
        .pipe(webp.default(opciones)) // Los convierte en formato WEBP y les baja la calidad especificada
        .pipe(dest('build/img')) // Los guarda en una nueva carpeta
    
    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución del script
}

function dev(done){ // Va a ser una funciona que vamos a ejecutar algunas funciones con el watch

    watch('src/scss/**/*.scss', css) // Cuando cambie la hoja de estilo, manda a llamar la función css

    done()
}

exports.css = css; // Aqui mandamos llamar a la función CSS.
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev); // Aqui mandamos llamar a la función dev.