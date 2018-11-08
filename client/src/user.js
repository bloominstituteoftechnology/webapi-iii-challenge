

//== User ======================================================================

//-- Dependencies --------------------------------
import React from 'react';

//-- Component -----------------------------------
export default function User({item}) {
    return (
        <div className="user">
            <NameValuePair name="Name:" value={item.name} />
        </div>
    )
}

//-- Supplementary Components --------------------
function NameValuePair(props) {
    return (
        <div className="pair">
            <span
                className="pair_name"
                children={props.name}
            />
            <span
                className="pair_value"
                children={` ${props.value}`}
            />
        </div>
    );
}
