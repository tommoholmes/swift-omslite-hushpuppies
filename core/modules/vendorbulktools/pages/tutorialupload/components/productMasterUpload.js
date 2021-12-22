import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';

const ProductMasterUpload = ({ urlDownload }) => {
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.titleTop}>Tutorial Upload Product</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>Ikuti instruksi berikut untuk mengunggah data produk</p>
                    <ol>
                        <li>
                            Siapkan berkas csv untuk mengunggah data produk, unduh contoh berkas csv yang berisi persyaratan data yang dibutuhkan
                            {' '}
                            <a href={urlDownload} className="link-button">
                                Klik Disini
                            </a>
                        </li>
                        <li>
                            <p>Buka contoh berkas csv yang telah diunduh. Anda dapat membukanya dengan aplikasi apapun seperti Microsoft Excel</p>
                            <p>
                                kolom dalam contoh berkas csv adalah syarat minimal untuk unggah produk. Anda bisa menambahkan kolom yang sudah
                                terdaftar di atribut produk
                            </p>
                            <img style={{ width: '100%' }} src="/assets/img/product-upload-excel.png" alt="excel-example" />
                            <p>Harap pastikan bahwa berkas csv yang akan diunggah sudah benar. Anda dapat memeriksa ulang dengan berkas csv anda</p>
                            <p>Ini merupakan contoh data csv yang salah yang akan menyebabkan kegagalan dalam pengunggahan</p>
                            <img style={{ width: '100%' }} src="/assets/img/incorrect-product-upload.png" alt="incorrect-example" />
                        </li>
                        <li>
                            <p>Pilih bulk type &quot;Product Upload Master&quot;</p>
                            <p>Lampirkan berkas csv dengan mengklik tombol &quot;Choose File&quot;</p>
                            <img style={{ width: '50%', height: '250px' }} src="/assets/img/product-upload-button.png" alt="excel-example" />
                        </li>
                        <li>
                            <p>Langkah terakhir, klik tombol &quot;Submit&quot; untuk mengunggah berkas csv, kemudian tunggu hingga proses selesai</p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default ProductMasterUpload;
