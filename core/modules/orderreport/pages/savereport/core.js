import React, { useEffect } from 'react';
import gqlService from '@modules/orderreport/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const {
        Content,
    } = props;

    const router = useRouter();
    const queryExport = router.query.export;
    const queryDateFrom = router.query.date_from;
    const queryDateTo = router.query.date_to;

    const [pdfDetail, setPdfDetail] = React.useState(null);

    const [getOrderReportPdf] = gqlService.getOrderReportPdf({
        variables: {
            export: queryExport,
            date_from: queryDateFrom,
            date_to: queryDateTo,
        },
        onCompleted: (res) => {
            if (res && res.getOrderReportPdf && res.getOrderReportPdf) {
                setPdfDetail(res.getOrderReportPdf);
            }
        },
    });

    const printPdf = {
        print_date: pdfDetail && pdfDetail.print_date,
        data: pdfDetail && pdfDetail.data,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_report',
    });

    const contentProps = {
        printPdf,
        aclCheckData,
    };

    useEffect(() => {
        getOrderReportPdf();
    }, []);

    if (aclCheckLoading) {
        return <>Loading...</>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => (
    <>
        <ContentWrapper {...props} />
    </>
);

export default Core;
