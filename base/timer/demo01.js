
setTimeout(() => {
  console.log('1');
  
}, 0)
immediate = setImmediate((xx) => {
  console.log(xx)
}, 12344)


console.log('2');
immediate.unref()
