/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@common_barcodescanner/style';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';

const App = ({
    barcode, handleDetect = () => { }, handleClose = () => { },
}) => {
    const classes = useStyles();
    const [isMatch, setIsMatch] = useState(null);

    const _onDetected = (res) => {
        if (barcode) {
            if (barcode === res.codeResult.code) {
                setIsMatch(1);
            } else {
                setIsMatch(0);
            }
        } else {
            setIsMatch(1);
        }
        handleDetect(res.codeResult.code);
        setTimeout(() => setIsMatch(null), 3000);
    };

    const startScanner = () => {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    target: document.querySelector('#scanner-container'),
                    constraints: {
                        facingMode: 'environment', // or user
                    },
                },
                numOfWorkers: navigator.hardwareConcurrency,
                locate: true,
                frequency: 1,
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true,
                },
                multiple: false,
                locator: {
                    halfSample: false,
                    patchSize: 'large', // x-small, small, medium, large, x-large
                    debug: {
                        showCanvas: false,
                        showPatches: false,
                        showFoundPatches: false,
                        showSkeleton: false,
                        showLabels: false,
                        showPatchLabels: false,
                        showRemainingPatchLabels: false,
                        boxFromPatches: {
                            showTransformed: false,
                            showTransformedBox: false,
                            showBB: false,
                        },
                    },
                },
                decoder: {
                    readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader'],
                },
            },
            (err) => {
                if (err) {
                    return;
                }
                Quagga.start();
            },
        );
        Quagga.onDetected(_onDetected);
        // Quagga.onProcessed((result) => {
        //     const drawingCtx = Quagga.canvas.ctx.overlay;
        //     const drawingCanvas = Quagga.canvas.dom.overlay;

        //     if (result) {
        //         if (result.boxes) {
        //             drawingCtx.clearRect(
        //                 0,
        //                 0,
        //                 parseInt(drawingCanvas.getAttribute('width')),
        //                 parseInt(drawingCanvas.getAttribute('height')),
        //             );
        //             result.boxes
        //                 .filter((box) => box !== result.box)
        //                 .forEach((box) => {
        //                     Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
        //                         color: 'green',
        //                         lineWidth: 2,
        //                     });
        //                 });
        //         }

        //         if (result.box) {
        //             Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
        //                 color: '#00F',
        //                 lineWidth: 2,
        //             });
        //         }

        //         if (result.codeResult && result.codeResult.code) {
        //             Quagga.ImageDebug.drawPath(
        //                 result.line,
        //                 { x: 'x', y: 'y' },
        //                 drawingCtx,
        //                 { color: 'red', lineWidth: 3 },
        //             );
        //         }
        //     }
        // });
    };

    const stopScanner = () => {
        Quagga.offProcessed();
        Quagga.offDetected();
        Quagga.stop();
    };

    useEffect(() => {
        startScanner();
        return () => {
            stopScanner();
        };
    }, []);

    return (
        <div style={{ marginBottom: 35 }}>
            <div className={classes.scan}>
                <div id="scanner-container">
                    <IconButton className={clsx(classes.closeButton, 'hidden-mobile')} onClick={handleClose}>
                        <CloseIcon className={classes.closeIcon} />
                    </IconButton>
                </div>
                <IconButton className={clsx(classes.closeButton, 'hidden-desktop')} onClick={handleClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>

            </div>
            <div className={clsx(classes.matchIcon, 'hidden-sorting')}>
                {isMatch !== null ? isMatch === 1 ? <CheckCircleIcon className={clsx(classes.icon, 'check')} />
                    : <CancelIcon className={clsx(classes.icon, 'cancel')} /> : null}
            </div>
        </div>
    );
};

export default App;
