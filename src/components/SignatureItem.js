import { useState, useEffect } from 'react';
import * as service from '../services/service';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faEye } from '@fortawesome/free-regular-svg-icons';
import ModalFile from './ModalFile';
function SignatureItem({ item, onClick }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (item) {
            const GetProfileDetailModels = async () => {
                const result = await service.GetProfileDetailModels(item.id);
                setData(result.data);
            };
            GetProfileDetailModels();
        }
    }, []);

    const handleViewFile = () => {
        if (item) {
            const GetFileContent = async () => {
                const result = await service.GetFileContent(item.id);
                const url = `data:application/pdf;base64,${result.data}`;
                fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], 'File name', { type: 'application/pdf' });
                        var url = URL.createObjectURL(file);
                        document.getElementById(
                            'iframeDisplayFile',
                        ).innerHTML = `<iframe src="${url}" style="width:100%; height:100%"></iframe>`;
                    });
            };
            GetFileContent();
        }
    };

    return (
        <>
            {item ? (
                <>
                    <tr>
                        <td>{item.title}</td>
                        <td onClick={handleViewFile} data-toggle="modal" data-target="#exampleModalFile">
                            {String(item.path).substr(item.path.lastIndexOf('\\') + 1)}
                        </td>
                        <td>
                            {item.isValid ? (
                                <FontAwesomeIcon icon={faCircleCheck} size="xl" style={{ color: '#00b33e' }} />
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: '#fb4010' }} />
                            )}
                        </td>
                        <td>{data.length > 0 ? <>{data[0].userName}</> : <></>}</td>
                        <td>{Moment(item.createdDate).format('DD/MM/YYYY kk:mm:ss')}</td>
                        <td onClick={onClick}>
                            {data.length > 0 ? (
                                <>
                                    <button
                                        className="btn btn-custom btn-primary show-form"
                                        value="0"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        title="Xem chi tiết"
                                    >
                                        <FontAwesomeIcon icon={faEye} size="xl" />
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}
                        </td>
                    </tr>
                </>
            ) : (
                <></>
            )}
            <ModalFile />
        </>
    );
}

export default SignatureItem;
