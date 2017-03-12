module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-postcss')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-php')

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
	        expand: true,
	        cwd: 'assets/sass',
	        src: ['styles.scss'],
	        dest: 'assets/css',
	        ext: '.css'
				}]
			}
		},
		postcss: {
	    options: {
	      map: true,
	      processors: [
	        require('pixrem')(),
	        require('autoprefixer')({browsers: 'last 2 versions'}),
	        require('cssnano')()
	      ]
	    },
	    dist: {
	      src: 'assets/css/*.css'
	    }
	  },
		coffee: {
			compile: {
				files: {
					'assets/js/scripts.js': 'assets/coffee/scripts.coffee'
				},
				options: {
					sourceMap: true
				},
			}
		},
		watch: {
			scripts: {
				files: ['assets/sass/*.scss', 'assets/coffee/*.coffee'],
				tasks: ['sass', 'postcss', 'coffee'],
			}
		},
    php: {
      dist: {
        options: {
          port: 9000
        }
      }
    }
	})
	grunt.registerTask('default', ['php', 'watch'])
}