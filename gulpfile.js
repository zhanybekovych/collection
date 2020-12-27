let gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync"),
  rename = require("gulp-rename"),
  del = require("del");

gulp.task("scss", function () {
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
        cascade: false,
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("html", function () {
  return gulp.src("src/*.html").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("scripts", function () {
  return gulp.src("src/js/*.js").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
});

gulp.task("images", function () {
  return gulp.src("src/images/**/*.*").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("watch", function () {
  gulp.watch("src/scss/*.scss", gulp.parallel("scss"));
  gulp.watch("src/*.html", gulp.parallel("html"));
  gulp.watch("images/**/*.*", gulp.parallel("images"));
  gulp.watch("js/*.js", gulp.parallel("scripts"));
});

gulp.task("export", async function () {
  let buildHtml = gulp.src("src/**/*.html").pipe(gulp.dest("dist"));
  let buildCss = gulp.src("src/css/**/*.css").pipe(gulp.dest("dist/css"));
  let buildJs = gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
  let buildFonts = gulp.src("src/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
  let buildImages = gulp
    .src("src/images/**/*.*")
    .pipe(gulp.dest("dist/images"));
});

gulp.task("clean", async function () {
  del.sync("dist");
});

gulp.task("build", gulp.series("clean", "export"));
gulp.task("default", gulp.parallel("scss", "browser-sync", "watch"));
