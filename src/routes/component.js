import Loadable from 'react-loadable';
import Loading from '@/components/Loading';


const Layout = Loadable({
    loader: () => import('@/views/Layout'),
    loading: Loading
});

const Login = Loadable({
    loader: () => import('@/views/Login/login'),
    loading: Loading
});

const Forget = Loadable({
    loader: () => import('@/views/Login/forget'),
    loading: Loading
});

const Dashboard = Loadable({
    loader: () => import('@/views/Dashboard/index'),
    loading: Loading
});

const UserList = Loadable({
    loader: () => import('@/views/User/user-list'),
    loading: Loading
});

const RoleList = Loadable({
    loader: () => import('@/views/User/role-list'),
    loading: Loading
});

const BasicInfo = Loadable({
    loader: () => import('@/views/Setting/My/basic-info'),
    loading: Loading
});

const ModifyPassword = Loadable({
    loader: () => import('@/views/Setting/My/modify-password'),
    loading: Loading
});


const IconList = Loadable({
    loader: () => import('@/views/Icon/index'),
    loading: Loading
});

const Line = Loadable({
    loader: () => import('@/views/Chart/line'),
    loading: Loading
});

const Bar = Loadable({
    loader: () => import('@/views/Chart/bar'),
    loading: Loading
});

const Pie = Loadable({
    loader: () => import('@/views/Chart/pie'),
    loading: Loading
});

const KeyBoard = Loadable({
    loader: () => import('@/views/Chart/keyboard'),
    loading: Loading
});

const Mix = Loadable({
    loader: () => import('@/views/Chart/mix'),
    loading: Loading
});

const China = Loadable({
    loader: () => import('@/views/Chart/china/index'),
    loading: Loading
});

const Excel = Loadable({
    loader: () => import('@/views/Module/excel'),
    loading: Loading
});

const Zip = Loadable({
    loader: () => import('@/views/Module/zip'),
    loading: Loading
});

const Pdf = Loadable({
    loader: () => import('@/views/Module/pdf'),
    loading: Loading
});

const FileAdmin = Loadable({
    loader: () => import('@/views/Module/file-admin'),
    loading: Loading
});

const RichText = Loadable({
    loader: () => import('@/views/Module/rich-text'),
    loading: Loading
});

const MarkDown = Loadable({
    loader: () => import('@/views/Module/markdown'),
    loading: Loading
});

const Authority = Loadable({
    loader: () => import('@/views/Authority/index'),
    loading: Loading
});

const NoAuthority = Loadable({
    loader: () => import('@/views/Error/no-authority'),
    loading: Loading
});

const NotFound = Loadable({
    loader: () => import('@/views/Error/not-found'),
    loading: Loading
});

const ServerError = Loadable({
    loader: () => import('@/views/Error/server-error'),
    loading: Loading
});


const components = {
    Layout,
    Login,
    Forget,
    Dashboard,
    UserList,
    RoleList,
    BasicInfo,
    ModifyPassword,
    IconList,
    Line,
    Bar,
    Pie,
    KeyBoard,
    Mix,
    China,
    Excel,
    Zip,
    Pdf,
    FileAdmin,
    RichText,
    MarkDown,
    Authority,
    NoAuthority,
    NotFound,
    ServerError
};

export default components;