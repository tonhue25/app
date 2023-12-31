import { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../config.json';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';
import ModalFile from '../components/ModalFile';
function VerificationPage() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [signatures, setSignatures] = useState([]);
    const [selected, setSelected] = useState();
    const [index, setIndex] = useState(0);
    const [isDisplaySave, setIsDisplaySave] = useState(true);
    const [isDisplayView, setIsDisplayView] = useState(false);

    const handleSubmit = (e, isSave) => {
        e.preventDefault();
        if (file === undefined || file === null) {
            Swal.fire({
                title: 'Chưa chọn file!',
            });
            return;
        } else if (title === '' || title === ' ') {
            Swal.fire({
                title: 'Chưa nhập tiêu đề/nội dung!',
            });
            return;
        } else {
            try {
                const verify = async () => {
                    uploadFile(isSave);
                };
                verify();
            } catch (err) {
                return;
            }
        }
    };

    const handleDisplay = (e, i) => {
        setSelected(e);
        setIndex(i);
    };

    const onSelectFile = (e) => {
        setIsDisplaySave(true);
        setIsValid(true);
        if (!e.target.files || e.target.files.length === 0) {
            Swal.fire({
                title: 'Chưa chọn file!',
            });
            setFile(undefined);
            return;
        } else {
            var type = e.target.files[0].name.split('.').pop();
            if ((type.toUpperCase() !== 'PDF') & (type.toUpperCase() !== 'DOCX') & (type.toUpperCase() !== 'DOC')) {
                Swal.fire({
                    title: 'Đinh dạng file là .pdf/.docx !',
                });
                document.getElementById('file-upload').value = '';
                setFile(null);
                return;
            } else {
                setIsDisplayView(true);
            }
        }
        setFile(e.target.files[0]);
    };

    const displayIframe = () => {
        var url = URL.createObjectURL(file);
        document.getElementById(
            'iframeDisplayFile',
        ).innerHTML = `<iframe src=${url} style="border:2px solid; width:100%; height:100%"></iframe>`;
    };

    const handleDelete = () => {
        document.getElementById('file-upload').value = '';
        setFile(null);
        setTitle('');
    };

    const [isClickButton, setIsClickButton] = useState(false);

    function uploadFile(isSave) {
        CheckExistFile();
        if (isSave) {
            if (isExistFile) {
                handleDelete();
                document.getElementById('signatures_id').style.display = 'none';
                Swal.fire('Tên file đã tồn tại!');
                return;
            }
        }
        document.getElementById('signatures_id').style.display = 'block';
        const url = `${configData.URL.SERVER_URL + '/' + configData.URL.SaveFile}`;
        const formData = new FormData();
        formData.append('userid', JSON.parse(sessionStorage.getItem('account')).userId);
        formData.append('isSave', isSave);
        formData.append('file', file);
        formData.append('title', title);

        const API = axios.create({
            baseURL: configData.URL.SERVER_URL,
        });

        API.interceptors.request.use((req) => {
            Swal.fire({
                title: 'Đang xử lí',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 20000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then(function (result) {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Timeout',
                        timer: 2000,
                    }).then((result) => {});
                }
            });
            return req;
        });

        API.post(url, formData)
            .then((response) => {
                Swal.close();
                setIsClickButton(false);
                setSignatures(response.data);
                if (response.data.length > 0) {
                    setSelected(response.data[0]);
                    if (isSave) {
                        Swal.fire('Lưu file thành công!');
                        setIsDisplaySave(false);
                        return;
                    }
                } else {
                    Swal.fire('File không có chữ ký!');
                    handleDelete();
                }
            })
            .catch((error) => {
                Swal.fire('Upload file thất bại!');
                handleDelete();
            });
    }

    const [isExistFile, setIsExistFile] = useState();

    function CheckExistFile() {
        const url = `${configData.URL.SERVER_URL + '/' + configData.URL.CheckExistFilename}`;
        const formData = new FormData();
        formData.append('userid', JSON.parse(sessionStorage.getItem('account')).userId);
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios
            .post(url, formData, config)
            .then((response) => {
                setIsExistFile(response.data);
            })
            .catch((error) => {
                Swal.fire('Upload file thất bại!');
            });
    }

    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        if (signatures) {
            signatures.forEach((element) => {
                if (!element.isValid) {
                    setIsValid(false);
                }
            });
        }
    }, [signatures]);

    return (
        <>
            <div className="container mt-5 pb-5">
                <div className="card card-body mt-5 border-dark">
                    <div className="row ">
                        <div className="col-11">
                            <label className="col-form-label ms-3 mb-2">
                                Chọn file PDF/DOCX cần kiểm tra xác thực chữ ký:
                            </label>
                            <input
                                id="file-upload"
                                className="form-control mb-3"
                                type="file"
                                accept=".pdf, .doc, .docx"
                                asp-for="UploadedFile"
                                data-bs-value="Trống"
                                onChange={onSelectFile}
                            />
                        </div>
                        <div className="col-1" style={{ marginLeft: '-15px', marginTop: '46px' }}>
                            <div className="row justify-content-center">
                                {file && isDisplayView ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#exampleModalFile"
                                        onClick={displayIframe}
                                    >
                                        Xem file
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="title">
                            Tiêu đề/Nội dung:
                        </label>
                        <textarea
                            id="title"
                            className="form-control"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ''}
                        />
                    </div>
                    <div className="row justify-content-center">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            value="Upload file"
                            onClick={(e) => handleSubmit(e, false)}
                        >
                            KIỂM TRA XÁC THỰC CHỮ KÝ
                        </button>
                    </div>
                </div>
                <div id="signatures_id">
                    {signatures.length > 0 ? (
                        <>
                            <Modal
                                signatures={signatures}
                                handleDisplay={handleDisplay}
                                index={index}
                                filename={file ? file.name : ''}
                                isValid={isValid}
                                selected={selected}
                                array={selected.errMsgs ? selected.errMsgs : []}
                            />
                            {isDisplaySave ? (
                                <>
                                    <div className="row justify-content-center mt-4">
                                        <div>
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                value="Upload file"
                                                onClick={(e) => handleSubmit(e, true)}
                                            >
                                                LƯU FILE VÀ THÔNG TIN XÁC THỰC
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <ModalFile />
        </>
    );
}

export default VerificationPage;
