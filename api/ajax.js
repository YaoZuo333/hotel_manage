function ajax(url='',type='GET') {
    return new Promise(function (resolve,reject) {
        let xhr;

        xhr = new XMLHttpRequest();

        xhr.open(type,url,true);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    })

}

ajax('https://jsonplaceholder.typicode.com/todos/1').then(res=>{
    console.log(res);
});
