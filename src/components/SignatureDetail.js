import Moment from 'moment';
function SignatureDetail({ data, index }) {
    return (
        <>
            {data ? (
                <>
                    <div
                        style={{
                            className: data.isValid
                                ? ' tab-pane border-3 border-success'
                                : 'tab-pane border-3 border-danger',
                        }}
                        className={index == 0 ? 'active' : ''}
                        id={'tab' + index}
                    >
                        <div className="card mb-2 border ">
                            <div className="card-body">
                                {data.isValid ? (
                                    <div className="row">
                                        <span style={{ color: 'green' }}>[CHỮ KÝ HỢP LỆ]</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <span style={{ color: 'red' }}>[CHỮ KÝ KHÔNG HỢP LỆ]</span>
                                        </div>
                                        <div className="row">
                                            <ul className="nav flex-column">
                                                {data.errMsgs ? (
                                                    // data.errMsgs.map((item) => (
                                                    //     <li>
                                                    //         <span className="nav-link">{item}</span>
                                                    //     </li>
                                                    // ))
                                                    <li></li>
                                                ) : (
                                                    <></>
                                                )}
                                            </ul>
                                        </div>
                                    </>
                                )}
                                <hr />
                                <div className="row">
                                    <label className="col-form-label col-md-2">Bên ký:</label>
                                    <span className="col-form-label col-md-8 ">{data.subject}</span>
                                </div>
                                <div className="row">
                                    <label className="col-form-label col-md-2">Bên cấp:</label>
                                    <span className="col-form-label col-md-8 ">{data.issuer}</span>
                                </div>
                                <div className="row">
                                    <label className="col-form-label col-md-2">Số serial:</label>
                                    <span className="col-form-label col-md-8 ">{data.serialNumber}</span>
                                </div>
                                <div className="row">
                                    <label className="col-form-label col-md-2">Ngày hiệu lực:</label>
                                    <span className="col-form-label col-md-8 ">
                                        {Moment(data.validFrom || data.notBefore).format('DD/MM/YYYY kk:mm:ss')}
                                    </span>
                                </div>
                                <div className="row">
                                    <label className="col-form-label col-md-2">Ngày hết hạn:</label>
                                    <span className="col-form-label col-md-8 ">
                                        {Moment(data.validTo || data.notAfter).format('DD/MM/YYYY kk:mm:ss')}
                                    </span>
                                </div>
                                <div className="row">
                                    <label className="col-form-label col-md-2">Hash:</label>
                                    <span className="col-form-label col-md-8 ">{data.thumbprint}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default SignatureDetail;
