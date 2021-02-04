import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

function Categoryform({handleSubmit, name, loading, setName}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group p-3">
                <label>Name</label>
                <input type="text" style={{width:'60%'}} autoFocus className="form-control input-sm" required value={name} onChange={e => setName(e.target.value)} /> 
                <br />
                {loading ? (<button className="btn btn-dark btn-raised"><LoadingOutlined /></button>) : (<button className="btn btn-dark btn-raised">Save</button>)}
            </div>
        </form>
    )
}

export default Categoryform
