const { src, dest, watch } = require('gulp'); //Entonces, src sirve para identificar un archivo y dest sirve para guardarlo.
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

function dev(done){ // Va a ser una funciona que vamos a ejecutar algunas funciones con el watch

    watch('src/scss/**/*.scss', css) // Cuando cambie la hoja de estilo, manda a llamar la función css

    done()
}

exports.css = css; // Aqui mandamos llamar a la función CSS.
exports.dev = dev; // Aqui mandamos llamar a la función dev.