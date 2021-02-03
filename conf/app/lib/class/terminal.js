var form = new Form();
var appName = document.querySelectorAll('.app-name');


var recentProjectPath = localStorage.recentProjectPath;
var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];

appName.forEach(element => {
    element.innerHTML = modepath;
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

function PressEnter(element,event){
    alert('ou')
    if(event.key === "Enter"){
        form.Terminal(element.value,(res)=>{
            if(res[0] != null){
                terminalOut.innerHTML += `<br><pre><small>${res[0]}</small></pre>`;
                terminalOut.scrollTop = terminalOut.scrollHeight;
            }else{
                terminalOut.innerHTML += `<br><pre><small>${res[1]}</small></pre>`;
                terminalOut.scrollTop = terminalOut.scrollHeight;
            }
        });
        element.setAttribute('placeholder',element.value);
        element.setAttribute('readonly','true');
        terminalArea.innerHTML += `<section><span class="app-name">${modepath}</span> <article>$</article><input class="terminalInput" type="text"></section>`;
        event.preventDefault();
    }
}

terminalInput.addEventListener('keydown',function(event){
        if(event.key === "Enter"){
            form.Terminal(this.value,(res)=>{
                if(res[0] != null){
                    terminalOut.innerHTML += `<br><pre><small>${res[0]}</small></pre>`;
                    terminalOut.scrollTop = terminalOut.scrollHeight;
                }else{
                    terminalOut.innerHTML += `<br><pre><small>${res[1]}</small></pre>`;
                    terminalOut.scrollTop = terminalOut.scrollHeight;
                }
            });
            this.setAttribute('placeholder',this.value);
            this.setAttribute('readonly','true');
            this.removeAttribute('id');
            terminalArea.innerHTML += `<section><span class="app-name">${modepath}</span> <article>$</article><input id="terminalInput" type="text"></section>`;
            terminalInput.innerHTML = terminalInput.innerHTML;
            event.preventDefault();
        }
});
