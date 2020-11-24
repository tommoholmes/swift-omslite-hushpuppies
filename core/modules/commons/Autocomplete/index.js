// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState();
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        if (open) {
            (async () => {
                setLoading(true);

                const response = await fetch(
                    `https://country.register.gov.uk/records.json?page-size=15${query ? `&query=${query}` : '' }`,
                );
                await sleep(1e3); // For demo purposes.
                const countries = await response.json();
                setOptions(Object.keys(countries).map((key) => countries[key].item[0]));

                setLoading(false);
            })();
            console.log(query);
        } else {
            setOptions([]);
        }
    }, [open, debouncedQuery]);

    React.useEffect(() => {
        if (!open) {
            setQuery('');
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onInputChange={(e) => setQuery(e.target.value)}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
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
            )}
        />
    );
}
