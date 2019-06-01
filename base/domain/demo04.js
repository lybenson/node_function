const domain = require('domain');

const d1 = domain.create();
const d2 = domain.create();

let p;
d1.run(() => {
  p = Promise.resolve(42);
});

// console.log(p.doamin);
d2.run(() => {
  p.then((v) => {
    // running in d2
  });
});
