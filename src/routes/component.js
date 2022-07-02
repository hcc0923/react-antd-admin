import Loadable from 'react-loadable';
import Loading from '@/components/Loading';


const Layout = Loadable({
    loader: () => import('@/views/Layout'),
    loading: Loading
});

const Container = Loadable({
    loader: () => import('@/views/Container'),
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
    loader: () => import('@/views/User/userlist'),
    loading: Loading
});

const RoleList = Loadable({
    loader: () => import('@/views/User/rolelist'),
    loading: Loading
});

const BasicInfo = Loadable({
    loader: () => import('@/views/Setting/My/basicInfo'),
    loading: Loading
});

const ModifyPassword = Loadable({
    loader: () => import('@/views/Setting/My/modifyPassword'),
    loading: Loading
});

const System = Loadable({
    loader: () => import('@/views/Setting/System/index'),
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

const UDFile = Loadable({
    loader: () => import('@/views/Module/udfile'),
    loading: Loading
});

const RichText = Loadable({
    loader: () => import('@/views/Module/richtext'),
    loading: Loading
});

const MarkDown = Loadable({
    loader: () => import('@/views/Module/markdown'),
    loading: Loading
});

const Authority = Loadable({
    loader: () => import('@/views/Permission/authority'),
    loading: Loading
});

const Page = Loadable({
    loader: () => import('@/views/Permission/page'),
    loading: Loading
});

const NoAuth = Loadable({
    loader: () => import('@/views/Error/401'),
    loading: Loading
});

const NotFound = Loadable({
    loader: () => import('@/views/Error/404'),
    loading: Loading
});

const ServerError = Loadable({
    loader: () => import('@/views/Error/500'),
    loading: Loading
});

const EpidemicMap = Loadable({
    loader: () => import('@/views/Chart/EpidemicMap/index'),
    loading: Loading
});

const About = Loadable({
    loader: () => import('@/views/About/index'),
    loading: Loading
});


const components = {
    Layout,
    Container,
    Login,
    Forget,
    Dashboard,
    UserList,
    RoleList,
    BasicInfo,
    ModifyPassword,
    System,
    IconList,
    Line,
    Bar,
    Pie,
    KeyBoard,
    Mix,
    EpidemicMap,
    Excel,
    Zip,
    Pdf,
    UDFile,
    RichText,
    MarkDown,
    Authority,
    Page,
    NoAuth,
    NotFound,
    ServerError,
    About
};

export default components;