import { Outlet } from 'react-router-dom';
import Header from './Header';
function Layout() {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
