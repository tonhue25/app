import { useState, useEffect } from 'react';
import * as service from '../services/service';
import SignatureItem from '../components/SignatureItem';
import Paging from '../components/Paging';
import Modal from '../components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
    const [index, setIndex] = useState(0);
    const [profiles, setProfiles] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedSignature, setSelectedSignature] = useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState({
        fileName: '',
        signerName: '',
        userId: '',
        verificationDate: '',
    });

    const [page, setPage] = useState(1);
    const RECORDS_PER_PAGE = 10;
    const lastIndex = page * RECORDS_PER_PAGE;
    const firstIndex = lastIndex - RECORDS_PER_PAGE;
    const records = profiles.slice(firstIndex, lastIndex);
    const [totalPages, setTotalPages] = useState();

    function handleClickPageNext(page) {
        setPage(page);
    }

    useEffect(() => {
        setTotalPages(Math.ceil(profiles.length / RECORDS_PER_PAGE));
    }, [profiles]);

    useEffect(() => {
        if (selectedRecord) {
            const GetProfileDetailModels = async () => {
                const result = await service.GetProfileDetailModels(selectedRecord.id);
                setSelectedSignature(result.data);
                console.log(result.data);
                if (result.data.length > 0) {
                    setSelectedItem(result.data[0]);
                    setIndex(0);
                }
            };
            GetProfileDetailModels();
        }
    }, [selectedRecord]);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const GetProfileModels = async () => {
            const result = await service.GetProfileModels(
                data.fileName.trim(),
                data.signerName.trim(),
                JSON.parse(sessionStorage.getItem('account')).userId,
                date,
            );
            setProfiles(result.data);
        };
        GetProfileModels();
    }, []);

    const handleSubmit = (e) => {
        setPage(1);
        e.preventDefault();
        data.verificationDate = date;
        const GetProfileModels = async () => {
            const result = await service.GetProfileModels(
                data.fileName.trim(),
                data.signerName.trim(),
                JSON.parse(sessionStorage.getItem('account')).userId.trim(),
                date,
            );
            setProfiles(result.data);
        };
        GetProfileModels();
    };

    const handleDisplay = (data, i) => {
        setSelectedItem(data);
        setIndex(i);
    };

    const [dateObj, setDateObj] = useState();
    const [date, setDate] = useState();
    const handleDate = (dt) => {
        setDateObj(dt);
        let normalFormate = dt === null ? '' : normalDateFormate(dt);
        setDate(normalFormate);
    };

    const normalDateFormate = (d) => {
        if (d) {
            return (
                ('0' + d.getDate()).slice(-2) +
                '/' +
                ('0' + (Number(d.getMonth()) + 1)).slice(-2) +
                '/' +
                d.getFullYear()
            );
        }
        return d;
    };

    const [errorMessa, setErrorMessa] = useState([]);
    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem.errMsgs.toString());
            let del_str = selectedItem.errMsgs.toString().replace('["', '');
            del_str = del_str.replace('"]', '');
            setErrorMessa(del_str.split('","'));
            console.log(errorMessa);
        }
    }, [selectedItem]);

    // const convertTo = (selected) => {
    //     if (selected.errMsgs) {
    //         console.log(selected.errMsgs.toString());
    //         let del_str = selected.errMsgs.toString().replace('["', '');
    //         del_str = del_str.replace('"]', '');
    //         setErrorMessa(del_str.split('","'));
    //     }
    //     return errorMessa;
    // };

    return (
        <div b-sc2ybqgu5x="" className="wrapper">
            <div b-sc2ybqgu5x="" className="content-wrapper" style={{ minHeight: '328.667px' }}>
                <div b-sc2ybqgu5x="" className="content-header" style={{ paddingTop: 10 }}>
                    <div b-sc2ybqgu5x="" className="container-fluid"></div>
                </div>
                <div b-sc2ybqgu5x="" className="content">
                    <div b-sc2ybqgu5x="" className="container" style={{ maxWidth: 1300 }}>
                        <div className="row justify-content-center">
                            <div className="col-sm-11">
                                <form>
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Tìm kiếm</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-sm-6">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <label htmlFor="SearchModel_LoanNo">Tên File</label>
                                                        </div>
                                                        <div className="col-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="fileName"
                                                                name="fileName"
                                                                onChange={onChange}
                                                                value={data.fileName || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-sm-6">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <label htmlFor="SearchModel_GuarNo">Người Ký</label>
                                                        </div>
                                                        <div className="col-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="signerName"
                                                                name="signerName"
                                                                onChange={onChange}
                                                                value={data.signerName || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-sm-6">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <label htmlFor="SearchModel_GuarNo">Ngày xác thực</label>
                                                        </div>
                                                        <div className="col-7">
                                                            {/* <div className="form-group mb-4">
                                                                <div
                                                                    className="datepicker date input-group"
                                                                    id="datepicker"
                                                                > */}
                                                            <div></div>
                                                            <DatePicker
                                                                selected={dateObj}
                                                                dateFormat="dd/MM/yyyy"
                                                                onChange={handleDate}
                                                                className="form-control"
                                                                style={{ width: '100%' }}
                                                            />
                                                            {/* <div className="input-group-append">
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-calendar" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer text-right">
                                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                                Lọc dữ liệu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
                            <div className="table-responsive">
                                <table
                                    id="datatable"
                                    className="table table-striped table-hover"
                                    style={{ width: '100%' }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Tiêu đề</th>
                                            <th>Tên File</th>
                                            <th>Hợp lệ</th>
                                            <th>Người đẩy file</th>
                                            <th>Ngày giờ xác thực</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records ? (
                                            <>
                                                {records.map((item, index) => (
                                                    <SignatureItem
                                                        key={index}
                                                        item={item}
                                                        onClick={() => setSelectedRecord(item)}
                                                    />
                                                ))}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {Paging(page, totalPages, handleClickPageNext)}
                        </div>
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-xl" role="document">
                                <div className="modal-content">
                                    <div className="modal-body" id="FormReview">
                                        {selectedSignature ? (
                                            <Modal
                                                signatures={selectedSignature}
                                                handleDisplay={handleDisplay}
                                                index={index}
                                                filename={String(selectedItem.fileName).substr(
                                                    selectedItem.fileName.lastIndexOf('\\') + 1,
                                                )}
                                                isValid={selectedRecord.isValid}
                                                selected={selectedItem}
                                                errorMessa={selectedItem.errMsgs ? selectedItem.errMsgs : []}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
