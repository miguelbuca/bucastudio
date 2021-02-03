const styleScrollBar = `
/*scroll Bar*/
<style>
::-webkit-scrollbar{
	width: 5px;
    height: 0.5px;
}
::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment{
    display: none;
}
::-webkit-scrollbar-track-piece{
    -webkit-border-radius: 100px;
    border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical{
	/*background: linear-gradient(20deg,#767676 ,#FFFFFF 100%,#767676);*/
	/*background: linear-gradient(45deg,#FFFFFF , #aeaeae, #FFFFFF);*/
    background: #006594;
	-webkit-border-radius: 100px;
}
</style>
`;

var tst = frame.contentDocument;

console.log(tst)

tst.innerHTML += styleScrollBar;
