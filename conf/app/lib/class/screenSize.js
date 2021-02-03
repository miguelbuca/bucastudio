var form = new Form();


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
