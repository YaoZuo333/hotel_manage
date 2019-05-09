import axios from 'axios'

export default function ajax(url='',parmas={},type='GET') {
  //1.定义promise对象
  let promise ;
  return new Promise((resolve,reject)=>{
    if ('GET' === type){
      let parmasStr ='';
      Object.keys(parmas).forEach((key)=>{
        parmasStr += key + '=' + parmas[key] + '&'
      });
      if (parmasStr !== ''){
        parmasStr = parmasStr.substr(0,parmasStr.lastIndexOf('&'));
      }
      url += '?' + parmasStr;
      promise = axios.get(url);
    } else if ('POST' === type){
      promise = axios.post(url,parmas);
    }
    //返回结果
    promise.then((response)=>{
      //console.log(response.data);
      resolve(response.data)
    }).catch(err=>{
      reject(err);
    })
  })
}
