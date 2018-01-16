var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),
	gulpRename = require('gulp-rename'),
	del = require('del');

var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
};
// Delete old files
gulp.task('beginClean',function(){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// Create the Sprite from svg icons
gulp.task('createSprite', ['beginClean'],  function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});

// copy Sprite Grahic to images Folder
gulp.task('copySpriteGraphic', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

// copy the sprites css to modules folder
gulp.task('copySpriteCSS', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(gulpRename(function(path){
		path.basename = '_' + path.basename;
		path.extname = '.css';
	}))
	.pipe(gulp.dest('./app/assets/styles/modules'));
});

// clean up and delete temp files
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
});

// perform all tasks
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);