import React from 'react'

export default function PDFButton(props) {
    return (
        <div>
            <button onClick={props.savePage}>Download PDF</button>
        </div>
    )
}
