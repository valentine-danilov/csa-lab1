import React from 'react'

export default class TableCell extends React.Component {

    /*     handleChange(e) {
            e.preventDefault()
            this.props.
        } */

    render() {
        const rowIndex = this.props.rowIndex;
        const colName = this.props.columnName;

        return this.props.render(rowIndex, colName);
    }

}