var watch = require('node-watch');
var { exec } = require('child_process');

console.log('watching .src/ ...');

watch('./src', { recursive: true }, function(evt, name) {
  exec('npm run build', (error, stdout, stderr) => {
    if(error) {
      console.error('run build error: ', error);
      return;
    }
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
  });
});
