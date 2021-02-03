var form = new Form();

var tab = document.querySelectorAll('.tab');
var tabView = document.querySelectorAll('.tab-view');

tab.forEach(element => {
    element.addEventListener('click',function(){
        for (let index = 0; index < tabView.length; index++) {
            tabView[index].style.display = 'none';
        }
        switch (this.getAttribute('code')) {
            case 'Base':
                tabView[0].style.display = 'flex';
                break;
            case 'Permições':
                tabView[1].style.display = 'flex';
                break;
            case 'Recursos da aplicação':
                tabView[2].style.display = 'flex';
                break;
        }
    });
});


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