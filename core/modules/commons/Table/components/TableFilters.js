/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    input: {
        paddingTop: '8.5px',
        paddingBottom: '8.5px',
    },
}));

const defaultFilterComponent = ({ filterValue, setFilterValue, disabled, typeInput }) => {
    const classes = useStyles();

    return (
        <TextField
            inputProps={{
                className: classes.input,
            }}
            type={typeInput || 'string'}
            variant="outlined"
            size="small"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            disabled={disabled}
        />
    );
};

const TableFilters = (props) => {
    const { initialFilters, setParentFilters, handleReset = () => { } } = props;

    // state
    const [filters, setFilters] = React.useState(initialFilters);
    const emptyFiltersField = filters && !filters.length;

    // methods
    const getFilterValueByField = (field) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        return index >= 0 ? filters[index].value : '';
    };
    const setFilterValueByField = (field, value) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        if (index >= 0) {
            setFilters(
                filters.map((filter) => ({
                    ...filter,
                    ...(filter.name === field.name && { ...field, value }),
                })),
            );
        } else {
            setFilters([...filters, { ...field, value }]);
        }
    };

    return (
        <div style={{ padding: 12 }}>
            {emptyFiltersField && <div style={{ padding: 12 }}>Filter fields is empty.</div>}
            {filters.map((field, i) => (field.hidden ? null : (
                <div
                    className={classnames('col-filter', field.class)}
                    key={i}
                    style={{ padding: 12, display: 'inline-block' }}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            if (!emptyFiltersField) setParentFilters(filters);
                        }
                    }}
                >
                    <div>{field.label}</div>
                    {(field.component || defaultFilterComponent)({
                        get filterValue() {
                            return getFilterValueByField(field);
                        },
                        setFilterValue: (value) => setFilterValueByField(field, value),
                        disabled: field.disabled,
                        typeInput: field.typeInput,
                    })}
                </div>
            )))}
            <div style={{ padding: 12 }}>
                <Button
                    buttonType="primary-rounded"
                    onClick={() => {
                        // only set filters which have value
                        if (!emptyFiltersField) setParentFilters(filters);
                    }}
                >
                    Apply Filters
                </Button>
                <Button
                    buttonType="link"
                    onClick={() => {
                        if (!emptyFiltersField) {
                            const resetedFilters = filters.map((filter) => (
                                { ...filter, value: filter.class === 'fixed' ? filter.initialValue : '' }
                            ));
                            setFilters(resetedFilters);
                            setParentFilters(resetedFilters);
                            handleReset();
                        }
                    }}
                >
                    Clear Filters
                </Button>
            </div>
        </div>
    );
};

TableFilters.propTypes = {
    initialFilters: PropTypes.array,
};

TableFilters.defaultProps = {
    initialFilters: [],
};

export default TableFilters;
