import React from 'react';
import { Link } from 'react-router';
require('../../css/components/basic/attention.css');

var SyncStore = require('../flux/stores/SyncStore');

/**
 * @author: dandingol03
 * @example
 * <Attention auto={true}/>
 * @description: this is a new component Attention
 * @property: data,string,这是通知吗？
 *
 */

var Attention = React.createClass({


    render: function () {
        var lis;
        if (this.props.data !== undefined && this.props.data !== null) {
            lis = new Array();
            if (Object.prototype.toString.call(this.props.data) != '[object Array]') {
                var i = 0;
                for (var field in this.props.data) {
                    var item = this.props.data[field];
                    lis.push(<li key={i++}>
                        <Link to={item.route}><i> </i>{item.label}</Link></li>);
                }
            } else {
                this.props.data.map(function (item, i) {
                    lis.push(<li key={i}>
                        <Link to={item.route}><i> </i>{item.label}</Link></li>);
                });
            }
        }

        return (
            <ul className="popular-in Attention">
                {lis !== undefined && lis !== null && lis.length != 0 ? lis : <span>您没有未完成的业务</span>}
            </ul>
        )

    }
});
module.exports = Attention;