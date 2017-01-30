let gulp = require('gulp'),
  riot = require('gulp-riot'),
  concat = require('gulp-concat'),
  esminify = require('esminify'),
  wait = require('gulp-wait'),
  del = require('delete'),
  stripDebug = require('gulp-strip-debug'),
  htmlReplace = require('gulp-html-replace'),
  fs = require("fs"),
  gutil = require('gulp-util'),
  crx = require("gulp-crx-pack"),
  replace = require("gulp-replace"),
  manifest = JSON.parse(fs.readFileSync('./src/manifest.json', 'utf8')),
  config = JSON.parse(fs.readFileSync('./config.json', 'utf8')),
  env = gutil.env.env || 'development';
gulp.task('watch', () => {
  gulp.watch(['./views/*.tag', './views/controllers/*.js'], ['riot']);
});
gulp.task('pack', ['crx-pack'], () => {
  return del.sync([`./${env}/**`]);
});
gulp.task('crx-pack', ['bundle'], () => {
  let crxFileName = `${manifest.name}_v${manifest.version}${env==='production'?'':'_'+env}.crx`;
  let codebase = `${manifest.update_url}/${crxFileName}`;
  let updateXmlFilename = `update.xml`;
  return gulp.src(env)
    .pipe(crx({
      privateKey: fs.readFileSync('./key.pem', 'utf8'),
      filename: crxFileName,
      codebase: codebase,
      updateXmlFilename: updateXmlFilename
    }))
    .pipe(gulp.dest('./build'));
});
gulp.task('version', () => {
  console.log(`\n\n\t\tcf_timer v${manifest.version}\n\n`);
});
gulp.task('upgrade', () => {
  let newVersion = gutil.env.version;
  if(!newVersion){
    return;
  }
  gulp.src('./package.json').pipe(replace(/\"version\"\: \"\d{1,}\.\d{1,}\.\d{1,}\"/g,`"version": "${newVersion}"`)).pipe(gulp.dest('./'));
  gulp.src('./src/manifest.json').pipe(replace(/\"version\"\: \"\d{1,}\.\d{1,}\.\d{1,}\"/g,`"version": "${newVersion}"`)).pipe(gulp.dest('./src/'));
  let changeLog = gutil.env.changelog;
  if(changeLog){
    changeLog = `\n\n>#### \`\`\`version ${newVersion}\`\`\`\n>* ${changeLog}`;
    fs.appendFileSync('changelog.md', changeLog);
  }
  console.log(`\r\nVersion upgraded from ${manifest.version} to ${newVersion}\r\n`);
});

gulp.task('bundle', ['delete', 'riot', 'copy', 'minifyJSLink', 'jsbundle'], () => {
  esminify.minify({
    "input": `./${env}/assets/bundle.min.js`,
    "output": `./${env}/assets/bundle.min.js`,
    format: {
      renumber: true,
      hexadecimal: true,
      escapeless: true,
      compact: true,
      semicolons: false,
      parentheses: false
    }
  });
  del.sync(['./configuration.js']);
});

gulp.task('delete', () => {
  del.sync(['dist/**', 'production/**', 'staging/**', 'build/**', 'development/**']);
});

gulp.task('riot', () => {
  return gulp.src('./views/*.tag')
    .pipe(riot({
      compact: true
    }))
    .pipe(concat('views.js'))
    .pipe(gulp.dest('./src/assets'))
    .pipe(wait(1000));
});

gulp.task('copy', () => {
  gulp.src(['./src/assets/img/*'])
    .pipe(gulp.dest(`./${env}/assets/img/`));
  gulp.src(['./src/assets/css/*'])
    .pipe(gulp.dest(`./${env}/assets/css/`));
  gulp.src(['./src/background.html', './src/manifest.json'])
    .pipe(gulp.dest(env));
});

gulp.task('minifyJSLink', () => {
  gulp.src('src/popup.html')
    .pipe(htmlReplace({
      'js': 'assets/bundle.min.js'
    }))
    .pipe(gulp.dest(env));
});

gulp.task('jsbundle', () => {
  let baseUrl = () => {
    return `let config = ${config[env]||{}}`;
  };
  fs.writeFileSync('./configuration.js', baseUrl());
  gulp.src(['./src/assets/lib/riot.csp.min.js', './src/assets/lib/route.min.js', './src/assets/views.js','./configuration.js','./src/assets/main.js'])
    .pipe(stripDebug())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(`${env}/assets/`));
  gulp.src('./src/assets/background.js')
    .pipe(stripDebug())
    .pipe(gulp.dest(`./${env}/assets/`))
    .on(`end`,()=>{
      esminify.minify({
        "input": `./${env}/assets/background.js`,
        "output": `./${env}/assets/background.js`,
        format: {
          renumber: true,
          hexadecimal: true,
          escapeless: true,
          compact: true,
          semicolons: false,
          parentheses: false
        }
      });    
    });
});

