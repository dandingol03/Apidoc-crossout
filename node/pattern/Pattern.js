/**
 * Created by outstudio on 16/6/28.
 */


var Pattern={

    author:function(ob){

        var re = /\@author:\s(.*?)\s*\*/.exec(ob);
        if(re)
        {
            console.log("author====");
            console.log("   "+re[1]);
        }

    },
    props:function(ob){


    },
    example:function(ob){
        var re=/@example\s*([\s|\S]*?)(?:\s\*\/|\s*\@)/.exec(ob);
        console.log("example====\r\n"+re[1].replace(/\*/g,""));
    },
    description:function(ob){
        var re=/\@description:(.*?)\s*\*/.exec(ob);
        console.log("description====\r\n"+re[1].replace(/\*/g,""));
    },
    comment:function(ob){
        var re =/\/\*\*\s*([\s|\S]*)\*\//.exec(ob);
        console.log("re===="+re[1]);
    }

}
module.exports=Pattern;