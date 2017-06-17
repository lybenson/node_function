# validator.js

一个字符串验证器和消毒剂库

### 服务端使用

使用 `npm install validator` 进行安装

```javascript
var validator = require('validator');

validator.isEmail('foo@bar.com'); //=> true
```

### ES6

```javascript
import validator from 'validator';
```

或者只导入库的一个子集

```javascript
import isEmail from 'validator/lib/isEmail';
```

### 客户端使用

该库可以作为独立脚本加载，也可以通过AMD兼容的加载程序进行加载

```html
<script type="text/javascript" src="validator.min.js"></script>
<script type="text/javascript">
  validator.isEmail('foo@bar.com'); //=> true
</script>
```

使用`bower`安装

```shell
$ bower install validator-js
```

### 验证方法

该库只能处理字符串类型，如果您不确定输入是否是字符串，需要转换成字符串即` input + ' `。传递除字符串以外的任何内容都是错误

- **contains(str, seed)** - 检查str是否包含seed
- **equals(str, comparison)** - 检查str是否等于comparison
- **isAfter(str [, date])** - 检查str是否是指定日期之后的日期（默认为date为现在）
- **isAlpha(str [, locale])** - 检查字符串是否只包含(a-zA-Z)，语言环境是其中之一 `['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'es-ES', 'fr-FR', 'hu-HU', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sr-RS', 'sr-RS@latin', 'tr-TR', 'uk-UA']`) 默认为:en-US
- **isAlphanumeric(str [, locale])** - 检查字符串是否只包含字母和数字，语言环境是其中之一 `['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'es-ES', 'fr-FR', 'fr-BE', 'hu-HU', 'nl-BE', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sr-RS', 'sr-RS@latin', 'tr-TR', 'uk-UA']`) 默认为:en-US.
- **isAscii(str)** - **检查字符串是否只包含ASCII字符**
- **isBase64(str)** - 检查字符串是否符合base64编码格式
- **isBefore(str [, date])** - 检查字符串是否是指定日期之前的日期。
- **isBoolean(str)** - **检查字符串是否是boolean值**
- **isByteLength(str, options)** - 检查字符串的长度是否在一个范围内，options是一个对象，默认为{min:0 max: undefined}
- **isCreditCard(str)** - 检查字符串是否是信用卡.
- **isCurrency(str, options)** - check if the string is a valid currency amount. `options` is an object which defaults to `{symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }`.
- **isDataURI(str)** - check if the string is a [data uri format](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs).
- **isDecimal(str)** - check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
- **isDivisibleBy(str, number)** - check if the string is a number that's divisible by another.
- **isEmail(str [, options])** - check if the string is an email. `options` is an object which defaults to `{ allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true }`. If `allow_display_name` is set to true, the validator will also match `Display Name `. If `require_display_name` is set to true, the validator will reject strings without the format `Display Name `. If `allow_utf8_local_part` is set to false, the validator will not allow any non-English UTF8 character in email address' local part. If `require_tld` is set to false, e-mail addresses without having TLD in their domain will also be matched.
- **isEmpty(str)** - check if the string has a length of zero.
- **isFQDN(str [, options])** - check if the string is a fully qualified domain name (e.g. domain.com). `options` is an object which defaults to `{ require_tld: true, allow_underscores: false, allow_trailing_dot: false }`.
- **isFloat(str [, options])** - check if the string is a float. `options` is an object which can contain the keys `min`, `max`, `gt`, and/or `lt` to validate the float is within boundaries (e.g. `{ min: 7.22, max: 9.55 }`). `min` and `max` are equivalent to 'greater or equal' and 'less or equal', respectively while `gt` and `lt` are their strict counterparts.
- **isFullWidth(str)** - check if the string contains any full-width chars.
- **isHalfWidth(str)** - check if the string contains any half-width chars.
- **isHexColor(str)** - check if the string is a hexadecimal color.
- **isHexadecimal(str)** - check if the string is a hexadecimal number.
- **isIP(str [, version])** - check if the string is an IP (version 4 or 6).
- **isISBN(str [, version])** - check if the string is an ISBN (version 10 or 13).
- **isISSN(str [, options])** - check if the string is an [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number). `options` is an object which defaults to `{ case_sensitive: false, require_hyphen: false }`. If `case_sensitive` is true, ISSNs with a lowercase `'x'` as the check digit are rejected.
- **isISIN(str)** - check if the string is an [ISIN](https://en.wikipedia.org/wiki/International_Securities_Identification_Number) (stock/security identifier).
- **isISO8601(str)** - check if the string is a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date.
- **isIn(str, values)** - check if the string is in a array of allowed values.
- **isInt(str [, options])** - check if the string is an integer. `options` is an object which can contain the keys `min`and/or `max` to check the integer is within boundaries (e.g. `{ min: 10, max: 99 }`). `options` can also contain the key `allow_leading_zeroes`, which when set to false will disallow integer values with leading zeroes (e.g. `{ allow_leading_zeroes: false }`). Finally, `options` can contain the keys `gt` and/or `lt` which will enforce integers being greater than or less than, respectively, the value provided (e.g. `{gt: 1, lt: 4}` for a number between 1 and 4).
- **isJSON(str)** - check if the string is valid JSON (note: uses JSON.parse).
- **isLength(str, options)** - check if the string's length falls in a range. `options` is an object which defaults to `{min:0, max: undefined}`. Note: this function takes into account surrogate pairs.
- **isLowercase(str)** - check if the string is lowercase.
- **isMACAddress(str)** - check if the string is a MAC address.
- **isMD5(str)** - check if the string is a MD5 hash.
- **isMobilePhone(str, locale)** - check if the string is a mobile phone number, (locale is one of `['ar-DZ', 'ar-SA', 'ar-SY', 'cs-CZ', 'de-DE', 'da-DK', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NG', 'en-NZ', 'en-US', 'en-CA', 'en-ZA', 'en-ZM', 'es-ES', 'en-PK', 'fi-FI', 'fr-FR', 'he-IL', 'hu-HU', 'it-IT', 'ja-JP', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'ro-RO', 'ru-RU', 'sr-RS', 'tr-TR', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW']`).
- **isMongoId(str)** - check if the string is a valid hex-encoded representation of a [MongoDB ObjectId](http://docs.mongodb.org/manual/reference/object-id/).
- **isMultibyte(str)** - check if the string contains one or more multibyte chars.
- **isNumeric(str)** - check if the string contains only numbers.
- **isSurrogatePair(str)** - check if the string contains any surrogate pairs chars.
- **isURL(str [, options])** - check if the string is an URL. `options` is an object which defaults to `{ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }`.
- **isUUID(str [, version])** - check if the string is a UUID (version 3, 4 or 5).
- **isUppercase(str)** - check if the string is uppercase.
- **isVariableWidth(str)** - check if the string contains a mixture of full and half-width chars.
- **isWhitelisted(str, chars)** - checks characters if they appear in the whitelist.
- **matches(str, pattern [, modifiers])** - check if string matches the pattern. Either `matches('foo', /foo/i)` or `matches('foo', 'foo', 'i')`.



