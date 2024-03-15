const { src, dest, watch, parallel} = require('gulp'); //Entonces, src sirve para identificar un archivo y dest sirve para guardarlo.

// CSS
const sass = require("gulp-sass")(require('sass')); // Manda a llamar la función SASS
const plumber = require('gulp-plumber'); // Instalamos la dependencia, extraemos la variable y la podemos utilizar
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); 
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');

// JavaScript
const terser = require('gulp-terser-js');

function css(done){

    // Identificar el archivo SASS
    // Compilarlo
    // Almacenarla en el disco duro

    src('src/scss/**/*.scss') //Toma la ubicación de donde está el archivo
        .pipe(sourcemaps.init())
        .pipe( plumber())
        .pipe( sass() ) // Le aplica SASS
        .pipe( postcss([autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) // Lo guarda en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución.
}

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,PNG,jpg,JPG}') // Busca recursivamente en todos los archivos y carpetas de la carpeta img con los formatos especificados
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )

    done();
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

function javascript(done){ // Va a ser una funcion que haga caso a las cosas de javascript
    src('src/js/**/*.js') // A todos los archivos con terminacion .js en la carperta src/js/
        .pipe(sourcemaps.init())
        .pipe( terser() ) // Va a mejorar el código de JavaScript
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js')); // Los va a guardar en el build en su propia carpeta js

    done();
}

function dev(done){ // Va a ser una funciona que vamos a ejecutar algunas funciones con el watch

    watch('src/scss/**/*.scss', css); // Cuando cambie la hoja de estilo, manda a llamar la función css
    watch('src/js/**/*.js', javascript); // Cuando cambie la hoja de estilo, manda a llamar la función css

    done()
}

exports.css = css; // Aqui mandamos llamar a la función CSS.
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, javascript, dev); // Aqui mandamos llamar a la función dev.