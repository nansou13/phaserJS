module.exports = config:
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(?!app)/

      order:
        before: [
          'vendor/phaser.js',
          'vendor/easystar-0.2.1.min.js',
          'vendor/phaser_pathfinding.min.js',
        ]

    stylesheets:
      joinTo:
        'styles/app.css'

  plugins:
    autoReload:
      port: 9193
    uglify:
      mangle: false
