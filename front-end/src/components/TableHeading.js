import React from 'react';

const TableHeading = (props) => (
    <thead>
        <tr>
            <th>
                <p>#</p>
            </th>
            {
                props.headings.map((value, i) =>
                    <th key={i}>
                        <a onClick={() => props.sortContent(value.name)} title="Sort"><i className="fas fa-sort"></i></a>
                        <p>{value.name}</p>
                    </th>)
            }
            <th>
                <p>Action</p>
            </th>
        </tr>
    </thead>
);

export default TableHeading;