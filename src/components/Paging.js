function PagingItem(page, totalPages, setPage) {
    let beforePages = page - 1;
    let afterPages = page + 1;
    let Items = [];

    if (page > 2) {
        Items.push(
            <li className={'page-item '}>
                <a value={1} className="page-link" onClick={() => setPage(1)}>
                    1
                </a>
            </li>,
        );
        if (page > 3) {
            Items.push(
                <li className={'page-item '}>
                    <a value={'...'} className="page-link">
                        ...
                    </a>
                </li>,
            );
        }
    }

    // if (page == totalPages) {
    //     beforePages = beforePages - 2;
    // } else if (page == totalPages - 1) {
    //     beforePages = beforePages - 1;
    // }

    // if (page == 1) {
    //     afterPages = afterPages + 2;
    // } else if (page == 2) {
    //     afterPages = afterPages + 1;
    // }

    for (let i = beforePages; i <= afterPages; i++) {
        if (i > totalPages) {
            continue;
        }
        if (i == 0) {
            i = i + 1;
        }
        Items.push(
            <li className={page == i ? 'page-item active' : 'page-item'} key={i}>
                <a value={i} className="page-link" onClick={() => setPage(i)}>
                    {i}
                </a>
            </li>,
        );
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            Items.push(
                <li className={'page-item '}>
                    <a value={'...'} className="page-link">
                        ...
                    </a>
                </li>,
            );
        }
        Items.push(
            <li className={page == totalPages ? 'page-item active' : 'page-item'} key={totalPages}>
                <a value={totalPages} className="page-link" onClick={() => setPage(totalPages)}>
                    {totalPages}
                </a>
            </li>,
        );
    }

    const handleClickPrevious = () => {
        if (page > 1) {
            setPage(--page);
        }
    };
    const handleClickNext = () => {
        setPage(++page);
    };

    return (
        <nav aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
            <ul className="pagination justify-content-center">
                {page > 1 ? (
                    <>
                        <li className={`page-item ${page == 1 ? 'not-allowed disabled' : ''}`}>
                            <a className="page-link" onClick={(e) => handleClickPrevious(e.target.value)}>
                                Previous
                            </a>
                        </li>
                    </>
                ) : (
                    <></>
                )}
                {Items}
                {page < totalPages ? (
                    <>
                        <li className={`page-item ${page == totalPages ? 'not-allowed disabled' : ''}`}>
                            <a className="page-link" onClick={(e) => handleClickNext(e.target.value)}>
                                Next
                            </a>
                        </li>
                    </>
                ) : (
                    <></>
                )}
            </ul>
        </nav>
    );
}

export default PagingItem;
