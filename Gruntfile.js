module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //    },
        //    build: {
        //        src: 'src/<%= pkg.name %>.js',
        //        dest: 'build/<%= pkg.name %>.min.js'
        //    }
        //},
        'http-server': {
            'dev': {
                root: 'app/',
                port: 8000,
                host: "localhost",
                autoIndex: true
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-http-server');

    // Default task(s).
    grunt.registerTask('default', ['http-server:dev']);

};