/* eslint-disable no-lonely-if */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

// debounced value will change only once every certain delay (ms)
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handleTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [value]);

    return debouncedValue;
}

const CustomAutocomplete = (props) => {
    const {
        error,
        getOptions,
        getOptionsVariables,
        getOptionLabel,
        helperText,
        label,
        labelKey,
        loading,
        mode,
        multiple,
        onChange,
        options,
        primaryKey,
        value,
        variant,
        ...others
    } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState();
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        if (open) {
            if (mode === 'lazy' && !(options && options.length)) {
                getOptions(getOptionsVariables);
            }
            if (mode === 'server') {
                const variables = {
                    variables: {
                        ...getOptionsVariables.variables,
                        ...(query && { querySearch: query }),
                    },
                };
                getOptions(variables);
            }
        }
    }, [open, debouncedQuery]);

    React.useEffect(() => {
        if (!open) {
            setQuery('');
        }
    }, [open]);

    const renderInput = (params) => (
        <TextField
            {...params}
            label={label}
            variant={variant}
            error={error}
            helperText={helperText}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
        />
    );

    return (
        <Autocomplete
            value={multiple ? (value || []) : value}
            open={open}
            getOptionSelected={(option, selectedValue) => option[primaryKey] === selectedValue[primaryKey]}
            getOptionLabel={getOptionLabel || ((option) => option && option[labelKey])}
            multiple={multiple}
            onChange={(event, newValue) => onChange(newValue)}
            onInputChange={(e) => setQuery((e && e.target && e.target.value) || '')}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            renderInput={renderInput}
            {...others}
        />
    );
};

CustomAutocomplete.propTypes = {
    error: PropTypes.bool,
    getOptions: PropTypes.func,
    getOptionsVariables: PropTypes.object,
    getOptionLabel: PropTypes.func,
    helperText: PropTypes.string,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf(['default', 'lazy', 'server']),
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array,
    primaryKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    variant: PropTypes.string,
};

CustomAutocomplete.defaultProps = {
    getOptionsVariables: { variables: { pageSize: 20, currentPage: 1 } },
    labelKey: 'name',
    loading: false,
    mode: 'default',
    multiple: false,
    options: [],
    primaryKey: 'id',
    value: null,
    variant: 'outlined',
};

export default CustomAutocomplete;
