import SignatureDetail from './SignatureDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
function Modal({ signatures, handleDisplay, index, filename, isValid, selected, errorMessa, array }) {
    const [values, setValues] = useState([]);
    useEffect(() => {
        if (errorMessa) {
            console.log(errorMessa.toString());
            let del_str = errorMessa.toString().replace('["', '');
            del_str = del_str.replace('"]', '');
            var arr = del_str.split('","');
            setValues(arr);
        }
    }, [selected, errorMessa]);

    return (
        <div className="container mt-5">
            <p className="mb-3"> File : {filename}</p>
            <p className="mb-3">
                {' '}
                Kết quả xác thực :
                {isValid ? (
                    <span style={{ color: 'green' }}> CHỮ KÝ HỢP LỆ</span>
                ) : (
                    <>
                        <span style={{ color: 'red' }}> CHỮ KÝ KHÔNG HỢP LỆ</span>
                    </>
                )}
            </p>
            <p className="mb-3">Danh sách chữ ký số:</p>
            <div className="card border-dark">
                <div className="card-header bg-secondary">
                    <ul className="nav nav-tabs card-header-tabs">
                        {signatures.map((item, i) => (
                            <li
                                key={i}
                                className={`nav-item me-1 rounded-top ${item.isValid ? 'bg-success' : 'bg-danger'}`}
                                onClick={() => handleDisplay(item, i)}
                            >
                                <a
                                    className={i === index ? 'nav-link active' : 'nav-link '}
                                    type="button"
                                    data-bs-toggle="tab"
                                    data-bs-target={`#tab${i}`}
                                    aria-expanded="false"
                                    aria-controls={`tab${i}`}
                                    aria-selected={i === index ? 'true' : 'false'}
                                >
                                    {' '}
                                    <span>
                                        {item.isValid ? (
                                            <FontAwesomeIcon
                                                icon={faUserCheck}
                                                size="xl"
                                                style={{ color: '#01060e' }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faUserXmark}
                                                size="xl"
                                                style={{ color: '#01060e' }}
                                            />
                                        )}
                                    </span>{' '}
                                    <span className="ps-1">{item.signerName}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body tab-content">
                    <SignatureDetail data={selected} index={index} values={values} array={array} />
                </div>
            </div>
        </div>
    );
}

export default Modal;
