import Loadable from 'react-loadable';


export const loadable = (loader, loading) => {
    return Loadable({
        loader,
        loading() {
            return <div>Loading...</div>
        }
    });
}