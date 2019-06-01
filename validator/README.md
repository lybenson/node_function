# validator.js

一个字符串验证器库

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
- **isCurrency(str, options)** - 检查字符串是否是有效的货币金额， `options` 是一个对象，默认为 `{symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }`.
- **isDataURI(str)** - 检查字符串是否是uri格式.
- **isDecimal(str)** - 检查字符串是否表示十进制数字，如0.1，.3，1.1，1.00003，4.0等。
- **isDivisibleBy(str, number)** - 检查字符串是否是可被另一个字母整除的数字
- **isEmail(str [, options])** - 检查字符串是否是电子邮件. `options` 是一个对象，默认值为 `{ allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true }`.
- **isEmpty(str)** - 检查字符串的长度是否为零
- **isFQDN(str [, options])** - 检查字符串是否是完全指定域名 (如. domain.com). `options` 是一个对象，默认为 `{ require_tld: true, allow_underscores: false, allow_trailing_dot: false }`.
- **isFloat(str [, options])** - 检查字符串是否为浮点数。 `options` 是一个对象，包含的属性有 `min`, `max`, `gt`, 且/或 `lt` 去验证浮点的范围 (如 `{ min: 7.22, max: 9.55 }`). `min`和`max`分别等于“大于或等于”和“小于或等于”，而gt和lt表示大于和小于
- **isFullWidth(str)** - 检查字符串是否包含任何全角字符
- **isHalfWidth(str)** - 检查字符串是否包含任何半角字符。
- **isHexColor(str)** - 检查字符串是否为十六进制颜色。
- **isHexadecimal(str)** - 检查字符串是否为十六进制数。
- **isIP(str [, version])** - 检查字符串是否为IP地址（版本4或6）。
- **isISBN(str [, version])** - 检查字符串是否是ISBN（版本10或13）。
- **isISSN(str [, options])** -检查字符串是否是ISSN。 `options` 是一个对象默认为 `{ case_sensitive: false, require_hyphen: false }`. 如果 `case_sensitive` 为真, 则以小写字母“x”作为校验位的ISSN将被拒绝。
- **isISIN(str)** - 检查字符串是否为ISIN（库存/安全标识符）
- **isISO8601(str)** - 检查字符串是否是有效的ISO 8601日期。
- **isIn(str, values)** - 检查字符串是否在允许的数组中。
- **isInt(str [, options])** -检查字符串是否为整数。 `options` 是一个对象且包含属性`min`  且/或  `max` 去验证int的范围 (如 `{ min: 10, max: 99 }`). `options` 允许包含属性`allow_leading_zeroes`, 当设置为false时，将不允许以0开始的整数值 (如. `{ allow_leading_zeroes: false }`). 最后, `options` 能够包含属性 `gt` 且/或 `lt` 这将强制大于或小于所提供的值（例如，对于1和4之间的数字为{gt：1，lt; 4}）的整数）。
- **isJSON(str)** - 检查字符串是否有效JSON（使用JSON.parse）。
- **isLength(str, options)** - 检查字符串的长度是否在一个范围内。 options是一个默认为{min：0，max：undefined}的对象。
- **isLowercase(str)** - 检查字符串是否是小写。
- **isMACAddress(str)** - 检查字符串是否是MAC地址。
- **isMD5(str)** - 检查字符串是否是MD5哈希。
- **isMobilePhone(str, locale)** - 检查字符串是否是手机号码, ( locale是后面的值之一 `['ar-DZ', 'ar-SA', 'ar-SY', 'cs-CZ', 'de-DE', 'da-DK', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NG', 'en-NZ', 'en-US', 'en-CA', 'en-ZA', 'en-ZM', 'es-ES', 'en-PK', 'fi-FI', 'fr-FR', 'he-IL', 'hu-HU', 'it-IT', 'ja-JP', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'ro-RO', 'ru-RU', 'sr-RS', 'tr-TR', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW']`).
- **isMongoId(str)** - 检查字符串是否是MongoDB ObjectId的有效十六进制编码表示形式。
- **isMultibyte(str)** - 检查字符串是否包含一个或多个多字节字符。
- **isNumeric(str)** - 检查字符串是否只包含数字。
- **isSurrogatePair(str)** -**检查字符串是否包含 emoji表情字符**
- **isURL(str [, options])** - 检查字符串是否是一个URL。 `options` 是一个对象，默认为 `{ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }`.
- **isUUID(str [, version])** - 检查字符串是否是UUID（版本3,4或5）。
- **isUppercase(str)** - 检查字符串是否大写。
- **isVariableWidth(str)** - 检查字符串是否包含全半字符和半角字符的混合。
- **isWhitelisted(str, chars)** - 检查字符是否出现在白名单中。
- **matches(str, pattern [, modifiers])** - 检查字符串是否匹配正则。要么匹配（ 'foo'，/foo/ i）或匹配（ 'foo'， 'foo'， 'i'）。



### 转换器

- **blacklist(input, chars)** - 删除出现在黑名单中的字符。如 

  ```javascript
  var blacklist = validator.blacklist('abcdefga','a');  
  console.log('blacklist :', blacklist);  //blacklist :bcdefg
  ```


- **whitelist(input, chars)** - 删除不在白名单中出现的字符。

- *escape(input)** - 将 <, >, &, ', " 和 / 转换为html字符 

  ```javascript
  var escape = validator.escape('< - > - & - /');  
  console.log('escape :', escape);  //escape :&lt; - &gt; - &amp; - &#x2F;
  ```

- **unescape(input)** - 使用<，>，＆，'，“和/替换HTML编码实体。

- **ltrim(input [, chars])** - 从左边开始删除满足chars中的字符,直到不满足为止.

- **rtrim(input [, chars])** - 从右边开始删除满足chars中的字符,直到不满足为止.

- **stripLow(input [, keep_new_lines])** - 删除数字值<32和127的字符，主要是控制字符。如果`keep_new_lines`为true，则会保留换行符（\ n和\ r，hex 0xA和0xD）。 JavaScript中是Unicode-safe的。

- **toBoolean(input [, strict])** - 将输入字符串转换为布尔值。除了'0'，'false'和''之外的所有内容都返回true。在严格模式下，只有'1'和'true'返回true。

- **toDate(input)** - 将输入字符串转换为日期，如果输入不是日期，则返回null。

- **toFloat(input)** - 将输入字符串转换为float，如果输入不是float，则将其转换为NaN

- **toInt(input [, radix])** - 输入字符串转换为整数，或NaN如果输入不是整数。

- **trim(input [, chars])** - 从输入的两边删除字符（默认为空格）。

