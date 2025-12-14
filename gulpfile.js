// 1. Անհրաժեշտ Փաթեթներ
const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sass = gulpSass(dartSass); // Ուղղված Sass API
const browserSync = require('browser-sync').create();
const del = require('del'); // Համոզվեք, որ տեղադրված է del@5.1.0

// 2. Թղթապանակների Հասցեներ
const paths = {
    // Միայն SCSS-ի աղբյուրը
    scss: 'src/scss/**/*.scss',
    // ⬇️ Ավելացրեք այս երկու տողերը JS-ի և Նկարների համար
    jsSrc: 'static/js/**/*.js', // Աղբյուրը JS-ի համար (օրինակ՝ modal.js)
    imgSrc: 'static/img/**/*.*', // Աղբյուրը Նկարների համար (օրինակ՝ fb1.jpg)
    
    // Դուրս գալու թղթապանակներ
    dist: 'dist/', // Ընդհանուր build ելքային թղթապանակ
    flaskCssDest: 'static/css', 
    flaskTemplates: 'templates/' // HTML ֆայլերն արդեն այստեղ են, Gulp-ը չի դիպչում
};

// --- Առաջադրանքներ ---

// 3. Մաքրում
function cleanDist() {
    // Մաքրում ենք միայն այն ֆայլերը, որոնք Gulp-ը ստեղծում է (CSS-ը և dist-ը)
    // Չենք դիպչում templates/ թղթապանակին, որտեղ գտնվում է index.html-ը։
    return del([paths.dist, paths.flaskCssDest]); 
}

// 4. SCSS-ի Կոմպիլյացիա (Կոմպիլյացիա + Dist ում և Flask ում Պահպանում)
function scssTask() {
    return src(paths.scss, { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        
        // Պահպանում է CSS-ը dist-ում
        .pipe(dest(paths.dist + 'css', { sourcemaps: '.' }))
        
        // Պահպանում է CSS-ը Flask-ի static թղթապանակում
        .pipe(dest(paths.flaskCssDest, { sourcemaps: '.' }))
        .pipe(browserSync.stream()); // Վերաբեռնում է դիտարկիչը
}

// Նոր Task: JS ֆայլերը static/js-ից dist/js տեղափոխելու համար
function scriptsTask() {
    return src(paths.jsSrc)
        .pipe(dest(paths.dist + 'js')) // Տեղադրում է դրանք dist/js-ում
        .pipe(browserSync.stream()); 
}
// Նոր Task: Նկարները static/img-ից dist/img տեղափոխելու համար
function imagesTask() {
    return src(paths.imgSrc)
        .pipe(dest(paths.dist + 'img')); // Տեղադրում է դրանք dist/img-ում
}

// 5. Դիտարկիչի Սինքրոնիզացիա և Մոնիտորինգ (Միայն Մշակման Ռեժիմի Համար)
function serve(done) {
    browserSync.init({
        proxy: "http://127.0.0.1:5000", // Պահանջում է Flask-ի աշխատանք
        notify: false,
        open: false
    });
    
    // Մոնիտորինգ SCSS-ի համար
    watch(paths.scss, series(scssTask));
    
    // Մոնիտորինգ HTML-ի համար։ Փոփոխությունները templates/-ում կվերաբեռնեն դիտարկիչը
    watch(paths.flaskTemplates + '/**/*.html').on('change', browserSync.reload); 

    done();
}

// --- Էքսպորտ ---


// 6. Gulp Build Հրաման (Վերջնական արտադրանք)
// Հրամանը: gulp build
exports.build = series(
    cleanDist, 
    // Աշխատացնում ենք բոլոր tasks-ը զուգահեռ
    parallel(scssTask, scriptsTask, imagesTask) 
);

// 7. Gulp Default Հրաման (Մշակման Ռեժիմ)
// Հրամանը: npm start կամ gulp
exports.default = series(
    parallel(scssTask, scriptsTask, imagesTask), // Աշխատացնում ենք բոլոր tasks-ը սկզբում
    serve 
);

// Թարմացրեք serve ֆունկցիան՝ ավելացնելով մոնիտորինգ JS-ի համար
function serve(done) {
    browserSync.init({
        proxy: "http://127.0.0.1:5000",
        notify: false,
        open: false
    });
    
    // Մոնիտորինգ SCSS-ի համար
    watch(paths.scss, series(scssTask));
    
    // ⬇️ Ավելացրեք JS-ի մոնիտորինգ
    watch(paths.jsSrc, series(scriptsTask)); 
    
    // Մոնիտորինգ HTML-ի համար
    watch(paths.flaskTemplates + '/**/*.html').on('change', browserSync.reload); 

    done();
}