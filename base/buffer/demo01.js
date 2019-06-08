const buf = Buffer.alloc(256);

const len = buf.write('\u00bd + \u00bc = \u00be', 0);

console.log(`${len} 个字节: ${buf.toString('utf8', 0, len)}`);
