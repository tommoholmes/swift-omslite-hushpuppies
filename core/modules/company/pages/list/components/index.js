import React from 'react';

const CompanyListContent = (props) => {
    const { data } = props;

    React.useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div>
            Company List Content
        </div>
    );
};

export default CompanyListContent;
