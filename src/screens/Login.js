import { useState } from 'react';
import Redirect from '../Redirect';
import { SUCCESS, account, verification } from '../constant';
import * as service from '../services/service';
import Swal from 'sweetalert2';
function Login() {
    const [data, setData] = useState({
        userid: '',
        password: '',
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const Login = async () => {
                const response = await service.Login(data);
                if (response.data.code === SUCCESS) {
                    sessionStorage.setItem(account, JSON.stringify(response.data));
                    setTimeout(() => Redirect(verification));
                } else {
                    Swal.fire('Tài khoản hoặc mật khẩu không đúng!');
                }
            };
            Login();
        } catch (err) {
            return;
        }
    };

    return (
        <div
            className="Login-component"
            style={{
                backgroundImage: `url(/bglogin2.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100%',
            }}
        >
            <div className="container-fluid">
                <div className="col-lg-7 col-xl-7 mx-auto">
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3 className="text-uppercase text-center">
                        Ứng dụng kiểm tra xác minh chữ ký số trên văn bản điện tử
                    </h3>
                    <br />
                    <div style={{ maxWidth: '60%', justifyContent: 'center' }} className="mx-auto">
                        <form method="post" action="/User/Login">
                            <div className="form-group mb-3">
                                <input
                                    value={data.userid || ''}
                                    name="userid"
                                    id="userid"
                                    onChange={onChange}
                                    type="text"
                                    placeholder="Tài khoản"
                                    required=""
                                    autofocus=""
                                    className="form-control rounded-pill border-0 shadow-sm px-4"
                                    data-val="true"
                                    data-val-required="The Tên đăng nhập field is required."
                                    defaultValue=""
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    onChange={onChange}
                                    value={data.password || ''}
                                    id="inputPassword"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    required=""
                                    className="form-control rounded-pill border-0 shadow-sm px-4"
                                    data-val="true"
                                    data-val-required="The Mật khẩu field is required."
                                    name="password"
                                />
                                <br />
                            </div>
                            <div className="form-group mb-3 text-center">
                                <span className="alert-danger" />
                            </div>
                            <button
                                onClick={handleSubmit}
                                style={{ backgroundColor: '#1967b9' }}
                                type="submit"
                                className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
