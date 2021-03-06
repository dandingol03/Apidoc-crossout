import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/scaleBar/scaleBar.css';
import Panel from '../panel/Panel.jsx';
import Attention from '../basic/Attention.jsx';
var Password = require('../../components/compounds/password/PasswordElement.jsx');
var SyncStore = require('../../components/flux/stores/SyncStore');

/**
 * 1.通过ScaleBar.jsx控件直接往Attention组件注入未完成业务
 */

var ScaleBar =React.createClass({
    _onChange           : function () {
        var stores = SyncStore.getAll();
        for (var id in stores) {
            console.log("id=" + stores[id].route);
            console.log("data=" + stores[id].data);
        }


        this.setState({_todos: stores});
    },
    clickhide3:function(ref,sel1,sel2,sel3,sel4)
    {
        var category=this.refs[ref];
        var $category=$(category);
        var obj1=$category.find(sel1);
        $(obj1).click(function() {
            var obj2=$category.find(sel2);
            var obj3=$category.find(sel3);
            var obj4=$category.find(sel4);
            $(obj2).hide();
            $(obj3).animate({width:"0"}, 100);
            $(obj4).show();
            $(obj4).animate({width:"40px"}, 400);

        });
    },
    clickshow6:function(ref,sel1,sel2,sel3,sel4,sel5,sel6,cl)
    {
        var id;
        var screen_w=window.screen.width;
        var div_w;
        if(screen_w>960){
            div_w=(screen_w-960)/2+960;
        }else{
            div_w=960;
        }
        var category=this.refs[ref];
        var $category=$(category);
        var obj1=$category.find(sel1);
        var obj2=$category.find(sel2);
        var obj3=$category.find(sel3);
        var obj4=$category.find(sel4);
        var obj5=$category.find(sel5);
        var obj6=$category.find(sel6);
        $(obj1).click(function() {

            console.log();
            console.log();
            console.log();



            //cl=='hover'
            id=$(obj1).index($(this));
            $(obj1).removeClass(cl);
            //obj2=='.susp_show .susp_l li.sus',obj2高亮
            if($(obj2).eq(id).length>=1)
            {
                $(obj2).eq(id).addClass(cl);
                var background=$(obj2).eq(id).css("background");
                var re=/url.*\)/;
                var img=re.exec(background)[0];
                $(obj2).eq(id).css("background","#fff "+img+" no-repeat 10px 30px");
            }


            $(obj3).hide();
            $(obj3).eq(id).show();
            $(obj5).hide();
            $(obj4).show();
            $(obj6).stop();
            $(obj6).animate({width: div_w}, 400);


        });

    },
    clickshow7:function(ref,sel1,sel2,cl)
    {
        var category=this.refs[ref];
        var $category=$(category);
        var id;
        var obj1=$category.find(sel1);
        var obj2=$category.find(sel2);
        $(obj1).click(function() {
            id=$(obj1).index($(this));
            var re=/url.*\)/;
            var background;
            var img;

            $(obj1).removeClass(cl);
            background=$(obj1).css("background");
            img=re.exec(background)[0];
            $(obj1).css("background",""+img+" no-repeat 10px 30px");


            background=$(obj1).eq(id).css("background");
            img=re.exec(background)[0];
            $(obj1).eq(id).addClass(cl);
            $(obj1).eq(id).css("background","#fff "+img+" no-repeat 10px 30px");
            $(obj2).hide();
            $(obj2).eq(id).show();
        });
    },
    closeCb: function () {
        var ref = this.refs.sidebar;


    },
    fetch:function(){
        this.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function(response){
                var data;
                var ob=new Object();
                if(Object.prototype.toString.call(response)!='[object Array]')
                    if(response.data!==undefined&&response.data!==null)
                        if(Object.prototype.toString.call(response.data)=='[object Array]')
                            data=response.data;
                        else
                            data=response;
                ob.data$initialed=true;
                if(data!==undefined&&data!==null)
                    ob.data=data;
                this.setState(ob);
            }.bind(this)
        )

    },
    queryHandle:function(type,url,params,dataType,callback){
        $.ajax({
            type: type!==undefined&&type!==null?type:'POST',
            url: url,
            dataType: dataType!==undefined&&dataType!==null?dataType:'json',
            data: params,
            cache: false,
            success: function(response) {
                if(callback!==undefined&&callback!==null)
                    callback(response);
            },
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });


    },
    getInitialState:function(){

        var data$initialed;
        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data = this.props.data;
            data$initialed=true;
        }

        var auto;
        if(this.props.auto!==undefined&&this.props.auto!==null)
            auto=this.props.auto;


        return ({data: data, data$initialed: data$initialed, auto: auto, _todos: null});
    },
    render:function(){
        if(this.state.data$initialed!==true&&(this.props.data==null||this.props.data==undefined))
        {
            if(this.state.auto==true)
                this.fetch();
            return (<div></div>)

        }else{

            var susp_nav;
            var susp_show;
            if(this.state.data!==undefined&&this.state.data!==null)
            {
                var suspends=new Array();
                var showNavs=new Array();
                var showContents=new Array();
                var state = this.state;
                state.data.map(function (item, i) {

                    var background = "url('" + App.getResourceDeployPrefix() + item.img + "') no-repeat 10px 30px";
                    var sus_li_style={background:background};
                    suspends.push(<li key={i} style={sus_li_style}
                                      className={"sus_li"}>
                        <span style={{marginLeft:"20px"}}>{item.label}</span>
                    </li>);
                    var sus = "sus_li sus" + " " + i;
                    var sus_li_sus = {sus: sus};
                    showNavs.push(
                        <li className={sus} key={i} style={sus_li_style}>
                            <span style={{marginLeft:"20px"}}>{item.label}</span>
                        </li>);

                    //TODO:add component match,first check component type
                    var ctrl = null;
                    switch (item.type) {
                        case 'Panel':
                            ctrl = <Panel bean={item.content.bean}
                                          auto={item.content.auto}
                                          autoComplete={item.content.autoComplete}>
                            </Panel>
                            break;
                        case 'password':
                            ctrl = <Password title={item.content.title} action={item.content.action}/>
                            break;
                        case 'Attention':
                            var _todos = null;
                            if (state._todos !== undefined && state._todos !== null)
                                _todos = state._todos;
                            ctrl = <Attention {...item.content} data={_todos}/>
                            break;
                        default:
                            ctrl = item.content;
                            break;
                    }
                    showContents.push(
                        <div className="susp_r" style={{display: "block",paddingLeft:"10%",paddingTop:"20px"}} key={i}>
                            {ctrl}
                        </div>
                    );

                });

                susp_nav = <div className="suspend susp_nav" id="suspend" style={{width:"60px", display:"block"}}>
                            <ul>
                                {suspends}
                            </ul>
                        </div>

                susp_show=
                    <div className="susp_show" style={{width:"0px"}}>
                        <div className="susp_l susp_nav">
                            <ul>
                                {showNavs}
                            </ul>
                        </div>
                        {showContents}
                        <div style={{position:"absolute",bottom:"20px",right:"80px"}}>
                            <button className="btn_close btn-danger" style={{width:"200px",border:"0px"}}> 关闭</button>
                        </div>
                    </div>
            }


            return (
                <div className="sidebar" ref="sidebar">
                    {susp_nav}
                    <div id="fadee" className="shade" ></div>
                    {susp_show}
                </div>
            )


        }
    },
    componentDidMount:function(){

        //add event changeListener
        SyncStore.addChangeListener(this._onChange);

        var category=this.refs.sidebar;
        var $category=$(category);
        var fadee=$category.find("#fadee");
        var susp_show=$category.find(".susp_show");
        var suspend=$category.find("#suspend");
        var sidebar$li=$category.find(".sidebar li");
        console.log();
        console.log();
        $(fadee).click(function() {

            $(fadee).hide();
            $(susp_show).animate({width:0}, 100);
            $(suspend).show();
            $(sidebar$li).removeClass("hover");
            var lis=$category.find(".susp_show .sus_li.sus");
            lis.map(function(i,li) {
                var background=$(li).css("background");
                var re=/url.*\)/;
                var img=re.exec(background)[0];
                $(li).css("background",""+img+" no-repeat 10px 30px");
            });
        });

        $(suspend).mouseover(function() {
            $(this).stop();
            $(this).animate({width: "140px"}, 400);
        });
        $(suspend).mouseout(function(){
            $(this).stop();
            $(this).animate({width: "60px"}, 400);
        });

        this.clickshow6("sidebar",".susp_nav>ul>li",".susp_show .susp_l li.sus",".susp_show .susp_r","#fadee","#suspend",".susp_show","hover");

        this.clickshow7("sidebar",".susp_show .susp_l li.sus",".susp_show .susp_r","hover");

        this.clickhide3("sidebar",".btn_close","#fadee",".susp_show","#suspend")
    },
    componentWillUnmount: function () {
        //remove event changeListener
        SyncStore.removeChangeListener(this._onChange);
    }
});

module.exports = ScaleBar;