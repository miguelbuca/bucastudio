const HTML = {
    tag : new Map(
       [["a" , ["href","id","name"]]]
    )
}
const JS = {
    res : ['abstract','arguments','await','boolean','break','byte','case','catch','char','class','const','continue','debugger','default','delete','do','double','else','enum','eval','export','extends','false','final','finally','float','for','function','goto','if','implements','import','in','instaceof','int','interface','let','long','native','new','null','package','private','protected','public','return','short','static','super','switch','sychronized','this','trow','trows','transient','true','try','typeof','var','void','volatile','while','with','yeild']
}
class IDE{
    constructor(){
        //var settings = new loki('settings.json');
        //return settings;
    }

    ReadFile(){
        
    }

    addWord(oldText,cursorIndex,interlisence,textArea,text){
        var fullText = textArea.innerText;

        var TEXT_CHANGE = {
            startPositon : function (){
                var text_array = [...fullText];
                var sp = 0;

                for (var index = 0; index < cursorIndex; index++) {
                    if(text_array[index]==" "){
                        sp = index;
                    }
                }
                return sp;
            },
            getText : function (){
                var text_array = [...fullText];
                var textOut = '';
                var ch = true;
                for (var index = 0; index < text_array.length; index++) {
                    if(this.startPositon() == index){
                        text_array[this.startPositon()+1] = text;
                        index = (this.startPositon()+oldText.length);
                        if(this.startPositon()>0){
                            textOut += ' '+text_array[this.startPositon()+1];
                            ch=false;
                        }else{
                            textOut = text_array[this.startPositon()+1];
                        }
                    }else{
                        if(ch){
                            textOut += text_array[index];
                        }
                    }
                }
                return textOut;
            }
        };

        textArea.innerHTML = TEXT_CHANGE.getText();
        //console.log(TEXT_CHANGE.getText());
        interlisence.style.display = 'block';
    }
    getCaretTextIndex(input){
        return window.getSelection().getRangeAt(0).startOffset;
        if("selectionStart" in input && document.activeElement == input){
            return{
                start : input.selectionStart,
                end : input.selectionEnd
            }
        }else if(input.createTextRange){
            var sel = document.selection.createRange();
            if(sel.parentElement() == input){
                var rng = input.createTextRange();
                rng.moveToBookmark(sel.getBookmark());
                for(var len =0;rng.compareEndPoints("EndToStart",rng)>0;rng.moveEnd("character",-1)){
                    len++;
                }
                rng.setEndPoint("StartToStart",input.createTextRange());
                for(var pos = {start:0,end:len};rng.compareEndPoints("EndToStart",rng)>0;rng.moveEnd("character",-1)){
                    pos.start++;
                    pos.end++;
                }
                return pos;
            }
        }
        return -1;
    }
    caretStart(el,pos){
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el,pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    }
    getCaretPosition(){
        var x=0;
        var y=0;

        var sel = window.getSelection();
        if(sel.rangeCount){
            var range = sel.getRangeAt(0).cloneRange();
            if(range.getClientRects()){
                range.collapse(true);
                var rect = range.getClientRects()[0];
                if(rect){
                    y = rect.top;
                    x = rect.left;
                }
            }
        }
        return {
            x : x,
            y : y
        };
    }
    Interlisence(fileType,word) {
        let text = word;
        var textOut = new Map();

        switch (fileType) {
            case 'js':
                JS.res.forEach(element => {
                    if(element.substring(0,text.length) == text){
                        textOut.set(`res-${element}`,element);
                    }
                });
                break;
        
            default:
                break;
        }
        return [text,textOut];
    }
}