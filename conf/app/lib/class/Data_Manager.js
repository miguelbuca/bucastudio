class Data_Manager{
    constructor(){
        const datapath = __dirname.replace('windows','data')+'\\db.json';
        const loki = require('lokijs');
        const read = require('read-file-utf8');
        const data = read(datapath);
        this.db = new loki(datapath,{autosave:true});
        this.db.loadJSON(data);

        //console.log(this.db);
      // this.DefaultCollection();

        //console.log(this.db.getCollection('Settings').data);
    }
    DefaultCollection(){
        this.AddCollection('RecentFile');
        this.AddCollection('Settings');
    }
    AddCollection(name){
        var newCollection = this.db.addCollection(name);
        this.db.save();
        return newCollection;
    }
    CollectionInsert(collection,parameter){

        var col = this.db.getCollection(collection);

        var colData = this.CollectionReadData(collection);
        var vl = true;

        colData.forEach(Object => {
            if(Object.path == parameter.path){
                vl = false;
            }
        });

        if(vl){
            col.insert(parameter);
            this.db.save();
        }
    }
    CollectionUpdate(collection,parameter){

        var col = this.db.getCollection(collection);

        

        var colData = this.CollectionReadData(collection);

        var vl = true;

        colData.forEach(Object => {
            if(Object.path == parameter.path){
                vl = false;
            }
        });

        if(vl){
            col.update(parameter);
        }
        this.db.save();
    }
    CollectionReadData(collection){
        return this.db.getCollection(collection).data.reverse();
    }
}
