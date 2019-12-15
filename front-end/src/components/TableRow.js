import React from 'react'
import TableCell from './TableCell'

const TableRow = (props) => {
    const record = props.record;
    return (

        <tr>
            <td>
                {record.index + 1}
            </td>
            {
                record.columns.map((col, i) =>
                    <TableCell
                        key={i}
                        rowIndex={record.index}
                        columnName={col.name}
                        render={props.renderCell}
                    />
                )
            }

            <td>
                <a onClick={() => props.deleteRow(props.record.index)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
            </td>
        </tr>
    )
}

export default TableRow;