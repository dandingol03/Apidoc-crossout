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
    properties:function(ob){
        var re=/\@property:(.*?)\s*\*/.exec(ob);
        return re[1].replace(/\*/g,"");
    },
    example:function(ob){
        var re=/@example\s*([\s|\S]*?)(?:\s\*\/|\s*\@)/.exec(ob);
        return re[1].replace(/\*/g,"");
    },
    description:function(ob){
        var re=/\@description:(.*?)\s*\*/.exec(ob);
        return re[1].replace(/\*/g,"");
    },
    comment:function(ob){
        var re =/\/\*\*\s*([\s|\S]*)\*\//.exec(ob);
        return re[1].replace(/\*/g,"");
    }

}
module.exports=Pattern;