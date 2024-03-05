const { src, dest, watch } = require('gulp'); //Entonces, src sirve para identificar un archivo y dest sirve para guardarlo.
const sass = require("gulp-sass")(require('sass')); // Manda a llamar la función SASS

function css(done){

    // Identificar el archivo SASS
    // Compilarlo
    // Almacenarla en el disco duro

    src('src/scss/app.scss') //Toma la ubicación de donde está el archivo
        .pipe( sass() ) // Le aplica SASS
        .pipe(dest('build/css')) // Lo guarda en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución.
}

function dev(done){ // Va a ser una funciona que vamos a ejecutar algunas funciones con el watch

    watch('src/scss/app.scss', css) // Cuando cambie la hoja de estilo, manda a llamar la función css

    done()
}

exports.css = css; // Aqui mandamos llamar a la función CSS.
exports.dev = dev; // Aqui mandamos llamar a la función dev.