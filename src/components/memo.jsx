import React, { useState } from 'react';

export default function Memo({ memo }) {
    
    console.log(memo)

    return (
        <>
            {memo ? <div className="bg-yellow-50 border-l-5 border-yellow-400 p-6 my-3 mx-0 rounded">
                <p>
                        {memo}
                </p>
            </div>
            :
            null}
        </>
    );
};

