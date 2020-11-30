/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import PropTypes from 'prop-types';

const TableFilters = (props) => {
    const { fields } = props;
    return (
        <div style={{ padding: 12 }}>
            {fields.map((field, i) => (
                <div key={i} style={{ padding: 12, display: 'inline-block' }}>
                    <div>
                        {field.label}
                    </div>
                    <TextField
                        variant="outlined"
                    />
                </div>
            ))}
            <div style={{ padding: 12 }}>
                <Button buttonType="primary-rounded">Apply Filters</Button>
                <Button buttonType="link">Clear Filters</Button>
            </div>
        </div>
    );
};

TableFilters.propTypes = {
    fields: PropTypes.array,
};

TableFilters.defaultProps = {
    fields: [
        { name: 'noFrom', label: 'No From' },
        { name: 'noTo', label: 'No To' },
        { name: 'name', label: 'Name' },
        { name: 'code', label: 'Code' },
        { name: 'framework', label: 'Framework' },
        { name: 'ruleType', label: 'RuleType' },
    ],
};

export default TableFilters;
