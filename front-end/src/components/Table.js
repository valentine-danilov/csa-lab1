import React from 'react'
import TableRow from './TableRow'
import TableHeading from './TableHeading'
import { sortRecords, getInputName, getCellAlignment } from './Utils'
import { submitPost, submitHugeData } from './Fetch'
import StudentForm from './StudentForm';

export default class Table extends React.Component {

    constructor(props) {
        super(props);

        const names = [
            {
                name: "Subject",
                isEditable: true,
                type: "text"
            },
            {
                name: "Reporting type",
                isEditable: true,
                type: "text"
            },
            {
                name: "Number of hours",
                isEditable: true,
                type: "number"
            },
            {
                name: "Professor's name",
                isEditable: true,
                type: "text"
            },
            {
                name: "Result",
                isEditable: true,
                type: "number"
            },
            {
                name: "Date",
                isEditable: true,
                type: "date"
            }
        ]


        this.state = {
            records: [],
            columnNames: names,
            columnNumber: names.length,
            sortDesc: true,
            studentInfo: {
                name: "asd",
                surname: "asd",
                university: "asd",
                faculty: "asd",
                enrollmentYear: 123123,
                studentId: 2131233
            }
        }

        this.handleTableValueChange = this.handleTableValueChange.bind(this);
        this.sortContent = this.sortContent.bind(this);

    }

    /* --- Manage table rows --- */
    addEmptyRow() {

        let records = this.state.records;

        const columns = this.state.columnNames.map(heading => {

            const column = {
                name: heading.name,
                value: "",
                isEditable: heading.isEditable,
                type: heading.type,
                isEditing: false
            }
            return column;
        })

        const record = {
            index: records.length,
            columns: columns
        }

        records.push(record);
        this.setState({
            records: records,
        });
    }

    deleteRow(index) {
        let records = this.state.records;
        records.splice(index, 1);

        /* Update indexes for rows */
        records.forEach((row, i) => (row.index = (i)))

        this.setState({
            records: records
        })

    }

    renderCell(rowIndex, colName) {

        const record = this.state.records[rowIndex];

        const column = record.columns.find(col => col.name === colName);
        const isEditing = column.isEditing;

        if (!isEditing) {
            return (
                <td onClick={() => this.onCellClick(rowIndex, colName)}>
                    <p className={getCellAlignment(column.type) + " " + "text-ellipsis"} >{column.value}</p>
                </td>
            );
        } else {
            return (
                <td>
                    <input
                        className="form-control"
                        onBlur={this.onCellBlur.bind(this)}
                        onKeyPress={this.onEnterPressed.bind(this)}
                        name={getInputName(rowIndex, colName)}
                        type={column.type}
                        defaultValue={column.value}
                        autoFocus
                    />
                </td>
            );
        }
    }

    sortContent(sortBy) {
        const sortDesc = this.state.sortDesc;
        const sortedRecords = sortRecords(this.state.records, sortBy, sortDesc);
        sortedRecords.forEach((row, i) => (row.index = (i)))
        this.setState({
            records: sortedRecords,
            sortDesc: !sortDesc
        })
    }
    /* --- */

    /* --- Handle cell events --- */
    onCellBlur(event) {
        this.handleTableValueChange(event);
    }

    onEnterPressed(event) {
        if (event.key === "Enter") {
            this.handleTableValueChange(event);
        }
    }

    onCellClick(rowIndex, colName) {

        let records = this.state.records;

        const record = records[rowIndex];
        const column = record.columns.findIndex(col => col.name === colName);
        const isEditing = record.columns[column].isEditing;

        if (!isEditing) {
            record.columns[column].isEditing = true;
            records[rowIndex] = record;
        }

        this.setState({
            records: records,
        })

        //alert(this.state.cellStates[rowIndex][cellIndex])

    }

    handleTableValueChange(event) {
        event.preventDefault();
        const inputNameSplit = event.target.name.split("-");
        const rowIndex = inputNameSplit[1];
        const colName = inputNameSplit[0];

        let records = this.state.records;

        const record = records[rowIndex];
        const column = record.columns.findIndex(col => col.name === colName);
        record.columns[column].isEditing = false;
        record.columns[column].value = event.target.value;

        records[rowIndex] = record;

        this.setState({
            records: records
        })

    }
    /* --- */

    /* --- Handle student info inputs events --- */
    handleStudentInfoValueChage(event) {
        event.preventDefault();
        const inputName = event.target.name;
        const inputValue = event.target.value;

        let studentInfo = this.state.studentInfo;
        studentInfo[inputName] = inputValue;

        this.setState({
            studentInfo: studentInfo
        });
    }

    onStudentInfoInputBlur(event) {
        this.handleStudentInfoValueChage(event);
    }
    /* --- */

    /* Fetching data */

    fetchRecordBook() {
        const studentInfo = this.state.studentInfo;
        const records = this.state.records;

        submitPost(studentInfo, records);
    }

    fetchHugeData() {
        const studentInfo = this.state.studentInfo;
        const records = this.state.records;

        submitHugeData(studentInfo, records);
    }

    async openNewDocument() {
        const response = await fetch("http://localhost:9000/document/open/new", {
            method: "GET"
        })

        if (response.status == 200) {
            console.log("Successfully opened MS Word document from template");
        } else {
            alert("Unable to open document")
        }
    }

    render() {

        const headings = this.state.columnNames;

        return (
            <div className="table-wrapper" >
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2>Record <b>Book</b></h2>
                                </div>
                            </div>

                        </div>
                        <StudentForm onBlur={(event) => this.onStudentInfoInputBlur(event)} />
                        <div className="col-sm-4 ">
                            <div className="row">
                                <div className="col-sm-12 text-left">
                                    <label htmlFor="id1" className="form-control-file btn btn-info open-template">
                                        Choose file
                                        </label>
                                    <input
                                        id="id1"
                                        type="file"
                                        hidden
                                        accept=".doc, .docx, .dotx"
                                    >
                                    </input>
                                    <button
                                        type="button"
                                        onClick={() => this.openNewDocument()}
                                        className="btn btn-info add-new">
                                        <i className="fa fa-plus"></i>
                                        New Document </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-left">
                                    <button
                                        onClick={() => this.fetchRecordBook()}
                                        type="button"
                                        className="btn btn-info open-template">
                                        Submit </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-left">
                                    <button
                                        onClick={() => this.fetchHugeData()}
                                        type="button"
                                        className="btn btn-info open-template">
                                        Submit Huge Data </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-left">
                                    <button
                                        type="button"
                                        onClick={() => this.addEmptyRow()}
                                        className="btn btn-info add-new">
                                        <i className="fa fa-plus"></i>
                                        Add New </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <table className="table table-bordered">
                    <TableHeading headings={headings} sortContent={this.sortContent} />
                    <tbody>

                        {
                            this.state.records.map((row, i) =>
                                <TableRow
                                    key={row.index}
                                    deleteRow={() => this.deleteRow(i)}
                                    renderCell={this.renderCell.bind(this)}
                                    record={row} />
                            )
                        }

                    </tbody>
                </table>

            </div>
        )
    }
}