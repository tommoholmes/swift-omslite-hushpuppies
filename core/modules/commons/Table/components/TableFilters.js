/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import PropTypes from 'prop-types';

const TableFilters = (props) => {
    const { fields } = props;
    const [filters, setFilters] = React.useState(props.filters);
    const getFilterValueByField = (field) => {
        const index = filters.findIndex((filter) => filter.field === field);
        return index >= 0 ? filters[index].value : '';
    };
    const setFilterValueByField = (field, value) => {
        const index = filters.findIndex((filter) => filter.field === field);
        if (index >= 0) {
            setFilters(filters.map((filter) => ({
                ...filter,
                ...(filter.field === field && { value }),
            })));
        } else {
            setFilters([...filters, { field, value }]);
        }
    };

    return (
        <div style={{ padding: 12 }}>
            {fields.map((field, i) => (
                <div key={i} style={{ padding: 12, display: 'inline-block' }}>
                    <div>
                        {field.label}
                    </div>
                    <TextField
                        variant="outlined"
                        value={getFilterValueByField(field)}
                        onChange={(e) => setFilterValueByField(field, e.target.value)}
                    />
                </div>
            ))}
            <div style={{ padding: 12 }}>
                <Button
                    buttonType="primary-rounded"
                    onClick={() => props.setFilters(filters.filter((e) => e.value))}
                >
                    Apply Filters
                </Button>
                <Button
                    buttonType="link"
                    onClick={() => {
                        setFilters([]);
                        props.setFilters([]);
                    }}
                >
                    Clear Filters
                </Button>
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
