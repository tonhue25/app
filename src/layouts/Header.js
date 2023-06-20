import { Link } from 'react-router-dom';
import { account, home, verification } from '../constant';
function Header() {
    const handleLogout = () => {
        sessionStorage.removeItem(account);
    };
    return (
        <header style={{ backgroundColor: '#1967b9' }}>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm bg-primary border-bottom box-shadow mb-3 p-3">
                <div className="container-fluid" style={{ display: 'flex', maxWidth: '80%' }}>
                    <div className="navbar-header">
                        <span style={{ color: 'white', textDecoration: 'none' }}>
                            SGB - Xác thực chữ ký số hợp đồng điện tử
                        </span>
                        <Link to={verification} className="ml-5 text-color text-size">
                            Xác thực
                        </Link>
                        <Link to={home} className="ml-5 text-color text-size">
                            Danh sách PDF
                        </Link>
                    </div>
                    <div className="navbar-header " style={{ justifyContent: 'flex-end', display: 'block' }}>
                        {sessionStorage.getItem(account) ? (
                            <>
                                <span style={{ color: 'white', textDecoration: 'none' }}>
                                    {JSON.parse(sessionStorage.getItem(account)).userName}
                                </span>
                            </>
                        ) : (
                            <></>
                        )}
                        <Link to={''} className="ml-5 text-color text-size" onClick={handleLogout}>
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
