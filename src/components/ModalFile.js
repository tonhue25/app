function ModalFile() {
    return (
        <div
            className="modal fade"
            id="exampleModalFile"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ height: '100%' }}
        >
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-body" id="iframeDisplayFile"></div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalFile;
