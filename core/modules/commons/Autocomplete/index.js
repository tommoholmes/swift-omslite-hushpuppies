/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// *https://www.registers.service.gov.uk/registers/country/use-the-api*
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
        id,
        getOptions,
        getOptionsVariables,
        label,
        labelKey,
        loading,
        mode,
        onChange,
        options,
        primaryKey,
        value,
        variant,
    } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState();
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        if (open) {
            if (mode === 'lazy' && !(options && options.length)) {
                getOptions(getOptionsVariables);
            }
        } else {
            //
        }
        // if (mode !== 'default') {
        //     if (open) {
        //         (async () => {
        //             setLoading(true);

        //             const response = await fetch(
        //                 `https://country.register.gov.uk/records.json?page-size=15${query ? `&query=${query}` : ''}`,
        //             );
        //             const countries = await response.json();
        //             setOptions(Object.keys(countries).map((key) => countries[key].item[0]));

        //             setLoading(false);
        //         })();
        //         console.log(query);
        //     } else {
        //         setOptions([]);
        //     }
        // }
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
            value={value}
            id={id}
            style={{ width: 300 }}
            open={open}
            getOptionSelected={(option, selectedValue) => option[primaryKey] === selectedValue[primaryKey]}
            getOptionLabel={(option) => option && option[labelKey]}
            onChange={(event, newValue) => onChange(newValue)}
            onInputChange={(e) => setQuery((e && e.target && e.target.value) || '')}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            renderInput={renderInput}
        />
    );
};

CustomAutocomplete.propTypes = {
    id: PropTypes.string,
    getOptions: PropTypes.func,
    getOptionsVariables: PropTypes.object,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf(['default', 'lazy', 'server']),
    onChange: PropTypes.func,
    options: PropTypes.array,
    primaryKey: PropTypes.string,
    value: PropTypes.object,
    variant: PropTypes.string,
};

CustomAutocomplete.defaultProps = {
    getOptionsVariables: { variables: { pageSize: 20, currentPage: 1 } },
    labelKey: 'name',
    loading: false,
    mode: 'default',
    options: [],
    primaryKey: 'id',
    value: null,
    variant: 'outlined',
};

export default CustomAutocomplete;
