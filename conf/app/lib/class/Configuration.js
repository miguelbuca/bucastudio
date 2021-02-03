const datapath = __dirname.replace('windows','data')+'\\db.json';
const loki = require('lokijs');
const read = require('read-file-utf8');
const data = read(datapath);
var db = new loki(datapath,{autosave:true});
db.loadJSON(data);

var form = new Form();


var settings = db.getCollection('Settings');

settings.insert({
    Android:{
        SDK_DIRECTORY : 'path'
    }
});

db.save();

console.log(settings.data)

SDK_DIRECTORY.addEventListener('click',function(){

    try{
        var path = form.GetProjectFolderPath();

        sdk_path.innerHTML = path;

        if(typeof db.CollectionReadData('Settings')[0].$loki == 'undefined'){
            db.CollectionInsert('Settings',{SDK_DIRECTORY : path});
        }else{
            db.CollectionUpdate('Settings',{SDK_DIRECTORY : path});
        }

        db.CollectionInsert('Settings',{SDK_DIRECTORY : path});
    }catch(e){
        console.warn(e.message);
    }
    
});