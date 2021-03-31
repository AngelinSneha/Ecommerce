import React from 'react'
import { Layout} from 'antd';
const { Footer} = Layout;

var d = new Date();
var n = d.getFullYear();

function FooterNav() {
    return (
        <div className="p-3 text-center footerStyle" style={{'backgroundColor':'#001529', 'color':'#fff'}}>
           © Copyright {n}. All Rights Reserved.
        </div>
        // <Footer style={{ textAlign: 'center' }}>© Copyright {n}. All Rights Reserved.</Footer>
    )
}

export default FooterNav
