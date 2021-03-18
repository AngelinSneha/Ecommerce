import React from 'react'

var d = new Date();
var n = d.getFullYear();
function Footer() {
    return (
        <div className="p-3 text-center mt-auto" style={{'backgroundColor':'#001529', 'color':'#fff'}}>
           © Copyright {n}. All Rights Reserved.
        </div>
    )
}

export default Footer
