process.on('uncaughtException', function() {
  console.log('uncaught listener');
});

process.setUncaughtExceptionCaptureCallback(function(e) {
  console.log('uncaught fn');
});

a.b();