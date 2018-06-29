import axios from 'axios'
// import default from 'axios';

const service = axios.create({
	//baseURL: process.env.BASE_API, // api的base_url
	// type: 'get',//请求类型，默认为 post
	timeout: 20000,// 请求超时时间
	// headers:{
	// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	// 	'X-Requested-With': 'XMLHttpRequest',
	// 	'Accept':'application/json, text/javascript, */*; q=0.01'
	// 	// 'X-Custom-Header':'foobar'
	// }
});

export default service