import Layout from '@layout';
import { useFormik } from 'formik';
import gqlService from '@modules/batchcreate/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [createPickByBatch] = gqlService.createPickByBatch();

    const handleSubmit = ({
        type,
        number_of_picker,
        number_of_sku,
    }) => {
        const variables = {
            type,
            number_of_picker,
            number_of_sku,
        };
        if (type === 'picker') {
            variables.number_of_picker = number_of_picker;
            variables.number_of_sku = null;
        }
        if (type === 'sku') {
            variables.number_of_sku = number_of_sku;
            variables.number_of_picker = null;
        }
        window.backdropLoader(true);
        createPickByBatch({
            variables,
        })
            .then(({ data }) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success create new batch!',
                    variant: 'success',
                });
                setTimeout(() => router.push(`/pickpack/batchlist/edit/${data.createPickByBatch.pick_by_batch.entity_id}`), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            type: '',
            number_of_picker: 1,
            number_of_sku: 1,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };
    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
