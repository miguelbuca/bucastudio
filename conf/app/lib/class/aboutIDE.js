var form = new Form();
let userAgent = window.navigator.userAgent.split(' ');

console.log(userAgent);
Versao.innerText = userAgent[10].split('/')[1];
Chrome.innerText = userAgent[11].split('/')[1];
Electon.innerText = userAgent[12].split('/')[1];
Vendedor.innerText = window.navigator.vendor;


btnMin.addEventListener('click',function(){
    if(this.getAttribute('enable') != 'false')
        form.Minimize();
});
btnMax.addEventListener('click',function(){
    if(this.getAttribute('enable') != 'false')
        form.Maxminize();
});
btnClose.addEventListener('click',function(){
    form.Close();
});
