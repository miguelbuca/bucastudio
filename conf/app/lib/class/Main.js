const read = require('read-file-utf8');
var ide = new IDE();
var form = new Form();
var db = new Data_Manager();

const ANDROID_BASE = 'C:\\Android\\sdk';


var textArea = document.querySelectorAll(".ed-code-area")[0];
var modeContainer = document.querySelectorAll(".mode-container")[0];
var maction = document.querySelectorAll(".maction");
var modeBottons = document.querySelectorAll(".mode-shoose-down>span");
var modeContainer = document.querySelectorAll(".mode");
var sbmaction = document.querySelectorAll(".sbmaction");
var edFile = document.querySelectorAll(".ed-file>section")[0];
var interlisence = document.querySelectorAll(".interlisence")[0];

var nav_area_item = document.querySelectorAll('.nav-area-item');
var workspaceDesign = document.querySelectorAll('.workspaceDesign')[0];


let mode = false;
let minSizeZoom = 37;

nav_area_item.forEach(element => {
    element.addEventListener('click',()=>{
        element.getAttribute("exp") === "false" ? element.setAttribute("exp", "true") : element.setAttribute("exp", "false");
    })
});

btn_copy.addEventListener('click',(event)=>{
     event.preventDefault();
     document.execCommand("copy");
})

Zoom = (type) =>{

    let elmentZoom = workspaceDesign.style.zoom.substring(0, workspaceDesign.style.zoom.length - 1);
        
        if (type === 'In') {
            workspaceDesign.style.zoom = `${minSizeZoom = minSizeZoom+1}%`;
        } else if (type === 'Out') {
            workspaceDesign.style.zoom = `${minSizeZoom = minSizeZoom-1}%`;
        }
        
}

zoomIn.addEventListener('click',()=>{
    Zoom('In');
})
zoomOut.addEventListener('click', () => {
    Zoom('Out');
})

selectSizeScreen.addEventListener('click',()=>{
    form.DeviceScreenSize();
})

modeBottons.forEach(element => {
    element.addEventListener('click',()=>{
        var preview = document.querySelectorAll('.preview>div');

        if(mode == false && element.innerText == 'Design'){

            activeProjectFile.style.display = 'none';
            tagLife.style.display = 'flex';


            preview[0].style.display = 'none';
            preview[1].style.display = 'flex';

            modeContainer[0].style.display = 'none';
            modeContainer[1].style.display = 'flex';
            mode = true;
        } else if (mode == true && element.innerText == 'Código') {


            activeProjectFile.style.display = 'flex';
            tagLife.style.display = 'none';

            preview[0].style.display = 'flex';
            preview[1].style.display = 'none';


            modeContainer[0].style.display = 'flex';
            modeContainer[1].style.display = 'none';
            mode = false;
        }
    })
});

/** android loader */
function runEmulator(device) {
    opStart.innerHTML = 'executando o emulador';
    form.Terminal(ANDROID_BASE + '\\emulator', 'emulator -avd ' + device, (res) => {
        
        if(res[0] == null){
            console.log(res[1]);
        }
        opStart.innerHTML = `Operação terminada`;
    });
}

function iniAndroid() {
    opStart.innerHTML = `Configurações android`;
    form.Terminal(ANDROID_BASE + '\\emulator', 'emulator -list-avds', (res) => {
        if(res[0] == null){

            var deviceList = res[1].split("\n");
            
            for (let index = 0; index < deviceList.length-1; index++) {
                android_emulator.innerHTML += `<li onclick="runEmulator(this.innerText);" class="a-emulator">${deviceList[index]}</li>`;
            }
        }
        opStart.innerHTML = `Operação terminada`;
    });

    SDK_Manager.addEventListener('click',()=>{
        opStart.innerHTML = `SDK Manager`;
        form.Terminal(ANDROID_BASE,'"SDK Manager.exe"',(res)=>{
            opStart.innerHTML = `Operação terminada`;
        });
    });
    AVD_Manager.addEventListener('click',()=>{
        opStart.innerHTML = `AVD Manager`;
        form.Terminal(ANDROID_BASE,'"AVD Manager.exe"',(res)=>{
            opStart.innerHTML = `Operação terminada`;
        });
    });
    opStart.innerHTML = `Configurações do andoid terminadas`;
}

iniAndroid();



btnMin.addEventListener('click',function(){
    form.Minimize();
});
btnMax.addEventListener('click',function(){
    form.Maxminize();
});
btnClose.addEventListener('click',function(){
    form.Close();
});


var recentProjectPath = localStorage.recentProjectPath;


form.NavBarButton(document.querySelectorAll('.nav-slide>div'),document.querySelectorAll('.sep-nav')[0],document.querySelectorAll('.side-btn'));

edFile.offsetWidth = modeContainer.offsetWidth+'px';
function NavRefreash(element) {
    var array = localStorage.getItem(modepath).split('|');

    activeProjectFile.innerHTML = ``;
    var map = new Map();
    array.forEach(el => {
        if(el != '' && element.getAttribute('path') != el && el != 'null' && el != 'undefined'){
            if(map.has(el) == false){
                map.set(el,el);
            }
        }
    });
    sessionStorage.isOnFile = false;
    var sw = true;
    if(map.size == 0){
        pInterface.innerHTML = ``;
    }else{
        for (const [key] of map) {
            var el = key;
            activeProjectFile.innerHTML += `<div path="${el}" class="ed-item" onclick="edNavClick(this)">${el.split('\\')[el.split('\\').length-1]}<span class="close-item" path="${el}" onClick="reNavElem(this)">x</span></div>`;
            if(sw == true){
                form.ReadFile(pInterface,key);
                sw = false;
            }
        }
    }
    try{
        localStorage.getItem(modepath+'_isOn');
    }catch(e){
        console.warn(e.message);
    }
}
function edNavClick(element) {
    try{
        var recentProjectPath = localStorage.recentProjectPath;
        var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];


        localStorage.setItem(modepath,localStorage.getItem(modepath)+'|'+element.path);
        localStorage.setItem(modepath+'_LASTFILE',element.getAttribute('path'));


        lang_selected.innerHTML = `${element.getAttribute('path').split('.')[element.getAttribute('path').split('.').length-1]}`;
        
        form.ReadFile(pInterface,element.getAttribute('path'));
    }catch(e){
        console.warn(e.message);
    }
}
function reNavElem(element) {
    try {
        var recentProjectPath = localStorage.recentProjectPath;
        var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];

        var newDataHistory = '';

        var array = localStorage.getItem(modepath).split('|');

        array.forEach(el => {
            if(element != '' && element.getAttribute('path') != el && el != 'null' && el != 'undefined'){
                newDataHistory += el+'|';
            }
        });
        localStorage.setItem(modepath,newDataHistory);
        NavRefreash(element);
    } catch (e) {
        console.warn(e.message);
    }
}

function ProjectActiveFileLoad(path) {

    var listSize = 0;
    recFiles.innerHTML = `<ul>`;
        db.CollectionReadData('RecentFile').forEach(element => {
            if(listSize == 0){
                recFiles.innerHTML += `<strong class="sm-title-cat">REABRIR PROJECTO</strong>`;
            }
            if(listSize<element.path.length)
                listSize = element.path.length;

            recFiles.innerHTML += `<li path="${element.path}" onclick="form.OpenProject(this.getAttribute('path'))"><span>${element.path}</span></li>`;
        });
    recFiles.innerHTML += `</ul>`;
    recFiles.style.width = `${listSize/1.8}rem`;
    

    //contenteditable="true"
    pInterfaceDiv.innerHTML = `<code contenteditable="true" id="pInterface" ></code>`;

    try{
    var activeFile = localStorage.getItem(path).split('|');
    activeProjectFile.innerHTML = ``;

    var ac = '';

    activeFile.forEach(element => {
        if(element != '' && element != 'null' && element != 'undefined'){
            var lastFile = localStorage.getItem(path+'_LASTFILE');
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
                if(lastFile != null){
                lastFile = lastFile.replace('\\','/');
                    form.ReadFile(pInterface,lastFile);
                }
                activeProjectFile.innerHTML += `<div path="${element}" class="ed-item" onclick="edNavClick(this)">${element.split('\\')[element.split('\\').length-1]}<span class="close-item" path="${element}" onClick="reNavElem(this)">x</span></div>`;
                ac += element+'|';
            }
        }
        });
    }catch(e){
        console.warn(e.message);
    }
}

function ini() {
    try{
        var modepath = recentProjectPath.split('|')[recentProjectPath.split('|').length-2];
    
        ProjectActiveFileLoad(modepath);
    
        //new Notification('Hello', { body: 'Hello, world!', icon: __dirname + '/images/chevron.png' });


    }catch(e){
        console.warn(e.message);
    }
};

ini();



if(localStorage.recentProjectPath != null){
    var recentProjectPath = localStorage.recentProjectPath;

    form.OpenProject(recentProjectPath.split('|')[recentProjectPath.split('|').length-2]);
}


OpenProject.addEventListener('click',function(){

    var pathP = form.GetProjectFolderPath();

    if(localStorage.recentProjectPath != null){
        localStorage.recentProjectPath += pathP+'|';
    }else{
        localStorage.recentProjectPath = pathP+'|';
    }

    db.CollectionInsert('RecentFile',{Name: pathP.split('\\')[pathP.split('\\').length-1],path: pathP});
    form.OpenProject(pathP);
    ProjectActiveFileLoad(pathP);
});

function Interlicence(tags) {
    tags.forEach(element => {
        element.addEventListener('keyup',function(){
            console.log(this.innerText);
        });
    });
}

pInterface.addEventListener('keyup',function(){
    var tags = document.querySelectorAll('code>span');
    Interlicence(tags);
    if(this.innerHTML != '' && ide.getCaretTextIndex(this)>0){

        var cursorIndex = ide.getCaretTextIndex(this);
        var cursorPosition = ide.getCaretPosition();

        var text_array = '';

        console.log([this]);

        var sp = -1;
        if(cursorIndex > 1){
            text_array = [...this.innerHTML];
        }else{
            text_array = [..." "+this.innerHTML];
        }
        
        console.log(text_array);
        
        for (var index = 0; index < cursorIndex && cursorIndex>1; index++) {
            if(text_array[index]==" "){
                sp = index;
            }
        }

        var neword = this.innerHTML.substring(sp+1,cursorIndex);
        
        const Out = ide.Interlisence('js',neword);
        

        const word = Out[0];
        const textOut = Out[1];

        

        let i_pos = cursorIndex;
        interlisence.innerHTML = ``;
        for (const item of textOut) {
            var cat = item[0].split('-')[0];
            if(cat == 'res'){
                interlisence.innerHTML += `<li onclick="ide.addWord('${neword}',${i_pos},interlisence,textArea,this.innerHTML)"><img src="../lib/ui/src/ic_var.png">${item[1]}</li>`;
            }else{
                interlisence.innerHTML += `<li onclick="ide.addWord('${neword}',${i_pos},interlisence,textArea,this.innerHTML)">${item[1]}</li>`;
            }
        }


        interlisence.style.left = (cursorPosition.x+5)+'px';        
        interlisence.style.top = (cursorPosition.y+10)+'px';


        console.log(Out);

        interlisence.style.display = 'block';
    }else{
        interlisence.style.display = 'none';
    }
});

pInterface.addEventListener('click',function(){
    interlisence.style.display = 'none';
});
maction.forEach(element => {
    element.addEventListener('click',function(){
        form.MenuAction(this.id,this.getAttribute('path'));
    });
});

sbmaction.forEach(element => {
    element.addEventListener('click',function(){
        form.MenuAction(this.id,this.getAttribute('path'));
    });
});

function MenuDownOpenChild(element,action) {

    var index = element.children.length-1;

    var children = element.children[index];

    if(action == 'open'){
        children.style.display = 'flex';
    }else{
        children.style.display = 'none';
    }
}
function MenuDownOpen(element,action) {

    var index = 0;

    if(element.children[0].tagName == 'IMG'){
        index = 1;
    }


    var children = element.children[index];

    if(action == 'open'){
        children.style.display = 'flex';
    }else{
        children.style.display = 'none';
    }
}
opStart.innerHTML = `Pronto`;