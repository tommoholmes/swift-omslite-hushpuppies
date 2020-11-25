/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
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
        id, labelKey, mode, onChange, primaryKey, value,
    } = props;
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(props.options);
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState();
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        if (mode !== 'default') {
            if (open) {
                (async () => {
                    setLoading(true);

                    const response = await fetch(
                        `https://country.register.gov.uk/records.json?page-size=15${query ? `&query=${query}` : ''}`,
                    );
                    const countries = await response.json();
                    setOptions(Object.keys(countries).map((key) => countries[key].item[0]));

                    setLoading(false);
                })();
                console.log(query);
            } else {
                setOptions([]);
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
            label="Country"
            variant="outlined"
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
            getOptionLabel={(option) => option[labelKey]}
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
    labelKey: PropTypes.string,
    mode: PropTypes.oneOf(['default', 'lazy', 'server']),
    onChange: PropTypes.func,
    options: PropTypes.array,
    primaryKey: PropTypes.string,
    value: PropTypes.object,
};

CustomAutocomplete.defaultProps = {
    id: 'autocomplete',
    labelKey: 'name',
    mode: 'default',
    options: [],
    primaryKey: 'id',
    value: {},
};

export default CustomAutocomplete;
