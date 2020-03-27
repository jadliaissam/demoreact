import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Alert(props) {
    let className = "d-flex  justify-content text-center alert alert-dismissible fade show alert-" + props.cls;
    return (
        <div>
            {
                props.visible &&
                <div className={className} role="alert">
                    {props.message}
                </div>
            }
        </div>
    )
}