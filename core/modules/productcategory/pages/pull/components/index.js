/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import Table from '@common_table';
import Header from '@modules/productcategory/pages/list/components/Header';
import MuiAlert from '@material-ui/lab/Alert';

const PullProductCategoryContent = (props) => {
    const { data, loading, pullProductCategory } = props;
    const router = useRouter();
    router.push('/marketplace/productcategory');
    return (
        <div />
    );
};

export default PullProductCategoryContent;
