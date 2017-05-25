// console.log(new Date())
// console.log(JSON.stringify(new Date()))

// 阿里云短信生成签名

// console.log(JSON.stringify(new Date()).replace(/\"/g,''))

const code = '123456'

var crypto = require('crypto')
var d = {
	RecNum: '15395185406',
	Action: 'SingleSendSms',
	SignName: 'DMP平台',
	TemplateCode: 'SMS_57880127',
	ParamString: '{\"code\": \"' + code + '\"}',
	Format: 'JSON',
	Version: '2016-09-27',
	SignatureMethod: 'HMAC-SHA1',
	SignatureNonce: '9e030f6b-03a2-40f0-a6bsa-157d44532',
	SignatureVersion: '1.0',
	AccessKeyId: 'LTAIqZhj7Yx7Lnpl',
	Timestamp: JSON.stringify(new Date()).replace(/\"/g,'')
}
// Thu Mar 30 2017 00:45:00 GMT+0800 (CST)
console.log(decodeURIComponent(d.Timestamp))
function buildQueryString(d) {
	var i = 0;
	var ns = [];
	for(var k in d){
		ns[i] = k;
		i++;
	}
	console.log(ns + '------');
	ns.sort();
	console.log(ns + '=======');
	var str = ''
	for(var i in ns){
		if(str) str += '&';
		str += encodeURIComponent(ns[i]) + '=' + encodeURIComponent(d[ns[i]]);
	}
	return str;
}


var q = buildQueryString(d);

// AccessKeyId=testid&Action=SingleSendSms&Format=XML&ParamString=%7B%22name%22%3A%22d%22%2C%22name1%22%3A%22d%22%7D&RecNum=13098765432&RegionId=cn-hangzhou&SignName=%E6%A0%87%E7%AD%BE%E6%B5%8B%E8%AF%95&SignatureMethod=HMAC-SHA1&SignatureNonce=9e030f6b-03a2-40f0-a6ba-157d44532fd0&SignatureVersion=1.0&TemplateCode=SMS_1650053&Timestamp=2016-10-20T05%3A37%3A52Z&Version=2016-09-27
// 
// AccessKeyId  Action Format  ParamString  RecNum  RegionId SignName  SignatureMethod  SignatureNonce  SignatureVersion  TemplateCode  Timestamp  Version
console.log(q);

var s ='GET&%2F&'+encodeURIComponent(q);

// POST&%2F&AccessKeyId%3Dtestid%26Action%3DSingleSendSms%26Format%3DXML%26ParamString%3D%257B%2522name%2522%253A%2522d%2522%252C%2522name1%2522%253A%2522d%2522%257D%26RecNum%3D13098765432%26RegionId%3Dcn-hangzhou%26SignName%3D%25E6%25A0%2587%25E7%25AD%25BE%25E6%25B5%258B%25E8%25AF%2595%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3D9e030f6b-03a2-40f0-a6ba-157d44532fd0%26SignatureVersion%3D1.0%26TemplateCode%3DSMS_1650053%26Timestamp%3D2016-10-20T05%253A37%253A52Z%26Version%3D2016-09-27
console.log(s)

var hmac = function (s,key){
	var h = crypto.createHmac('sha1', key);
	h.update(s);
	return h.digest().toString('base64');
}

var key='XAdxiRQ9N7k5Os99vO2u1C4Vybyyke&';
var sign = hmac(s, key);

var param='Signature='+encodeURIComponent(sign)+'&'+decodeURIComponent(q);
console.log(param)

var url = 'https://sms.aliyuncs.com/?' + param;
console.log(url)
