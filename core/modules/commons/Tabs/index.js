import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PURPLE } from '@theme_color';

const useStyles = makeStyles(() => ({
    tabs: {
        boxShadow: 'none',
        '& .MuiTab-textColorInherit.Mui-selected': {
            color: `${PURPLE} !important`,
        },
    },
    label: {
        letterSpacing: 0,
        color: '#435179',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 16,
        margin: '0 1%',
        '@media (max-width: 767px )': {
            margin: '0',
            fontSize: '3vw',
            letterSpacing: '0.6px',
        },
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const CustomTabs = ({
    data = [],
    onChange,
    value,
    allItems = true,
    tabsProps = {},
    containerProps = {},
}) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setLocalValue(newValue);
    };
    return (
        <AppBar position="static" color="inherit" className={styles.tabs} {...containerProps}>
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: PURPLE,
                        minWidth: '60px',
                    },
                }}
                {...tabsProps}
            >
                {
                    allItems && (<Tab className={styles.label} label="All" {...a11yProps(0)} />)
                }
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return <Tab className={styles.label} key={index} {...itemData} {...a11yProps(allItems ? index + 1 : index)} />;
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;
