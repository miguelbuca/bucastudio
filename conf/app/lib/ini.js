const {app, BrowserWindow,Menu} = require('electron');

//Inicializar App
app.on('ready',()=>{
        win = new BrowserWindow({frame:false,padding:4,backgroundColor:'#434343',icon:__dirname+'/ui/src/logo.png',  show:false, webPreferences: {
            nodeIntegration: true
        }});
        
        win.loadURL('file://'+__dirname.replace('lib','windows')+'/home.html');
        //win.setFullScreen(true);
        win.setMenu(null);
        win.maximize();
        win.show();
        win.focus();
});


    