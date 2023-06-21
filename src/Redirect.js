const Redirect = (page) => {
    window.location = `${window.location.origin + '/' + page}`;
};
export default Redirect;
