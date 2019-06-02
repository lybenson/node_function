setTimeout(() => {
  console.log('setTimeout')
}, 0)


process.nextTick(() => {
  console.log('nextTick')
});

setTimeout(() => {
  console.log(process.uptime());
}, 7000);