const {app, BrowserWindow,Menu,remote} = require('electron');
const {dialog} = require('electron').remote;
const dirTree = require('directory-tree');
const fs = require('file-system');
const readLine = require('readline');
const exec = require('child_process').exec;

class Form{
    DirectoryTree(filePath){
        return dirTree(filePath,{});
    }
    Terminal(path,command,callback){
        //var recentProjectPath = localStorage.recentProjectPath;
        //var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];
        exec(command,{
            cwd: path
        },(error,stdout,stderr)=>{
            callback([error,stdout]);
        });
    }
    DeviceScreenSize(){
        let win = new remote.BrowserWindow({
            frame: false,
            resizable: false,
            parent: remote.BrowserWindow.getFocusedWindow(),
            backgroundColor: '#434343',
            icon: __dirname.replace('windows', 'lib') + '/ui/src/logo.png',
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        console.log([win])
        win.loadURL('file://' + __dirname.replace('lib', 'windows') + '/screenSize.html');
        win.setMenu(null);
        win.show();
        win.focus();
        win.setAlwaysOnTop(false, "floating", 1);
    }
    MenuAction(par,path){
        let win = null;
        switch (par) {
            case 'm-ide':
                 //off settings
                 // modal:true
                 win = new remote.BrowserWindow({frame:false,resizable:false,height:500,width:400,parent: remote.BrowserWindow.getFocusedWindow(),backgroundColor:'#434343',icon:__dirname.replace('windows','lib')+'/ui/src/logo.png',  show:false, webPreferences: {
                    nodeIntegration: true
                }});
                win.loadURL('file://'+__dirname.replace('lib','windows')+'/'+path);
                win.setMenu(null);
                win.show();
                win.focus();
                win.setAlwaysOnTop(false,"floating",1);
                break;
            case 'm-android-settings':
                 //off settings
                 // modal:true
                 win = new remote.BrowserWindow({frame:false,resizable:false,parent: remote.BrowserWindow.getFocusedWindow(),backgroundColor:'#434343',icon:__dirname.replace('windows','lib')+'/ui/src/logo.png',  show:false, webPreferences: {
                    nodeIntegration: true
                }});
                win.loadURL('file://'+__dirname.replace('lib','windows')+'/'+path);
                win.setMenu(null);
                win.show();
                win.focus();
                win.setAlwaysOnTop(false,"floating",1);
                break;
            case 'm-android-conf':
                 //off settings
                 // modal:true
                 win = new remote.BrowserWindow({resizable:false,parent: remote.BrowserWindow.getFocusedWindow(),backgroundColor:'#434343',icon:__dirname.replace('windows','lib')+'/ui/src/logo.png',  show:false, webPreferences: {
                    nodeIntegration: true
                }});
                win.loadURL('file://'+__dirname.replace('lib','windows')+'/'+path);
                //win.setMenu(null);
                win.show();
                win.focus();
                win.setAlwaysOnTop(false,"floating",1);
                break;
        }
        
    }
    ReadFile(container,filePath){

        var recentProjectPath = localStorage.recentProjectPath;
        var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];

        try{
            if(localStorage.getItem(modepath+'_isOn') != filePath){
                localStorage.setItem(modepath+'_isOn',filePath);
                let rl = readLine.createInterface({
                    input : fs.createReadStream(filePath)
                });
                let line_no = 0;

                fs.readFile(filePath,(err,data)=>{
                    if(err){
                        console.error(err);
                        return;
                    }
                    

                    setTimeout(() => {
                        container.style.display = 'block';


                        var tags = document.querySelectorAll('code>span');

                        tags.forEach(element => {
                            element.addEventListener('click',function(){
                                console.log(this.innerText);
                            });
                        });


                    }, 300);
                    container.style.display = 'none';
                    container.textContent = data.toString('utf8');
                    onDocumentLoad(); 
                });
                /*rl.on('line',function(line){
                    line_no++;
                    console.log(line);
                    //container.innerHTML += `<tr><td class="line-number" value="${line_no}"></td><td contenteditable="true" class="line-content"><pre>${line}</pre></td></tr>`;
                    container.innerText += `${line}`;
                });
                rl.on('close',function(line){
                    //container.innerHTML += `<tr><td class="line-number" value="${line_no+1}"></td><td contenteditable="true" class="line-content"></td></tr>`;
                });*/
            }
        }catch(e){
            console.warn(e.message);
        }
    }
    GetProjectFolderPath(){
        return dialog.showOpenDialog({properties:['openDirectory']})[0];  
    }
    OpenProject(url){

        const root = form.DirectoryTree(url);


        var cont = document.querySelector('.container-tree');
        cont.innerHTML = '';
        const tree = require('electron-tree-view')({
            root,
            container:cont,
            children: c=>c.children,
            label:c=>c.name
        })

        tree.on('selected',item=>{
            tree.loop.update({ root });
            if(item.type == 'file'){

                var recentProjectPath = localStorage.recentProjectPath;
                var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];


                localStorage.setItem(modepath,localStorage.getItem(modepath)+'|'+item.path);
                localStorage.setItem(modepath+'_LASTFILE',item.path);


                var array = localStorage.getItem(modepath).split('|');

                var ac = '';
                activeProjectFile.innerHTML = ``;
                array.forEach(element => {
                    if(element != '' && element != 'null' && element != 'undefined'){
                        var array = ac.split('|');
            
                        var out = false;
                        
                        array.forEach(s => {
                                var el1 = s.split('\\')[s.split('\\').length-1];
                                var el2 = element.split('\\')[element.split('\\').length-1] ;
                                if(el1 != '' && (el1 == el2)){
                                    out = true;
                                }
                        });
                        if(out == false){
                            activeProjectFile.innerHTML += `<div path="${element}" class="ed-item" onclick="edNavClick(this)">${element.split('\\')[element.split('\\').length-1]}<span class="close-item" path="${element}" onClick="reNavElem(this)">x</span></div>`;
                            ac += element+'|';
                        }
                    }
                });

                form.ReadFile(pInterface,item.path);
            }
        });

    }
   
    NavBarButton(navSlide,slide,buttons){
        for (let element of buttons) {
            element.addEventListener('click',function () {
                navSlide.forEach(element => {
                    element.style.display = 'none';
                });
                switch (element.innerText) {
                    case 'PROJECTO':
                        navSlide[0].style.display = 'block';
                        slide.style.top = (element.offsetTop-38)+'px';
                        break;
                    case 'FERRAMENTAS':
                        navSlide[1].style.display = 'flex';
                        slide.style.top = (element.offsetTop-38)+'px'; 
                        break;
                }  
            });
        }
    }
    Close(){
        remote.BrowserWindow.getFocusedWindow().close();
    }
    Minimize(){
        remote.BrowserWindow.getFocusedWindow().minimize();
    }
    Maxminize(){
        remote.BrowserWindow.getFocusedWindow().maxminize();
    }
}

var TextAreaLineNumbersWidthCanvas = function()
{
var div = document.createElement('div');

var cssTable = 'padding:0px 0px 0px 0px!important; margin:0px 0px 0px 0px!important; font-size:1px;line-height:0px;';
      var cssTd1 = 'border:none; vertical-align:top; width:0;';
      var cssTd2 = 'border:none;  vertical-align:top;';
      var cssButton = 'width:120px; height:40px; border:none !important; border-bottom-color: transparent!important; color:#fff; background-color:#434343';
      var cssCanvas = 'border:none; background-color:#434343; margin-top:0px; padding-top:0px;';
      var cssTextArea = 'position: relative;'
                       + 'width:100%;'
                       + 'height:100%;'
                       + 'display:block;'
                       + 'font-size:11pt;'
                       + 'line-height:15px;'
                       + 'margin: -2px 0px 0px 0px;'
                       + 'padding: 0px 0px 0px 0px;'
                       + 'color:rgba(255,255,255,.9);'
                       + 'letter-spacing: 1px;'
                       + 'resize: none;'
                       + 'border:none;'
                       + 'background-color:#434343;'
                       + 'white-space:nowrap; overflow:auto;'     
                       ;

      // LAYOUT (table 2 panels)
      var table = document.createElement('table');
          table.setAttribute('cellspacing','0');
          table.setAttribute('cellpadding','0');
          table.setAttribute('style', cssTable);
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
          td1.setAttribute('style', cssTd1);
      var td2 = document.createElement('td');
          td2.setAttribute('style', cssTd2);
          tr.appendChild(td1);
          tr.appendChild(td2);
          table.appendChild(tr);

      // TEXTAREA
      var ta = this.evalnode = document.createElement('div');
          ta.setAttribute('id','pInterfaceDiv');
          ta.setAttribute('style', cssTextArea);
          //ta.setAttribute('style', 'background:#434343;');
          //ta.value = this.S.get('eval') || '';  // get previous executed value ;)

      // TEXTAREA NUMBERS (Canvas)
      var canvas = document.createElement('canvas');
          canvas.width = 48;    // must not set width & height in css !!!
          canvas.height = 500;  // must not set width & height in css !!!
          canvas.setAttribute('style', cssCanvas);
          ta.canvasLines = canvas;
          td1.appendChild(canvas);
          td2.appendChild(ta);
          div.appendChild(table);

      // PAINT LINE NUMBERS
      ta.paintLineNumbers = function()
      {
        try
        {
        var canvas = this.canvasLines;
        if (canvas.height != this.clientHeight) canvas.height = this.clientHeight; // on resize
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#434343";
        ctx.fillRect(0, 0, 50*100, this.scrollHeight+1);
        ctx.fillStyle = "#808080";
        ctx.font = "10pt monospace"; // NOTICE: must match TextArea font-size(11px) and lineheight(15) !!!
        var startIndex = Math.floor(this.scrollTop / 15,0);
        var endIndex = startIndex + Math.ceil(this.clientHeight / 15,0);
        for (var i = startIndex; i < endIndex; i++)
        {
          var ph = 10 - this.scrollTop + (i*15);
          var text = ''+(1+i);  // line number
          ctx.fillText(text,40-(text.length*6),ph);
        }
        }
        catch(e){ alert(e); }
      };
      ta.onscroll     = function(ev){ this.paintLineNumbers(); };
      ta.onmousedown  = function(ev){ this.mouseisdown = true; }
      ta.onmouseup    = function(ev){ this.mouseisdown=false; this.paintLineNumbers(); };
      ta.onmousemove  = function(ev){ if (this.mouseisdown) this.paintLineNumbers(); };
      
    var textContainer = document.getElementById('textContainer');
    try{
        textContainer.appendChild(div);
    }catch(e){
        console.warn(e.message);
    }
    // make sure it's painted
	ta.paintLineNumbers();
    return ta;
}

var ta = TextAreaLineNumbersWidthCanvas();