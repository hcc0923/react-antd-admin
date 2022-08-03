import React from 'react';
import { connect } from 'react-redux';
import { 
    MenuFoldOutlined, 
    MenuUnfoldOutlined, 
} from '@ant-design/icons';
import { setCollapse } from "@/store/actions/collapsed";


const Hamburger = (props) => {
    const { collapsed, setCollapse } = props;
    return (
        <div 
            className="h-full flex items-center cursor-pointer text-2xl -ml-8" 
            onClick={() => setCollapse(!collapsed)}
        >
            {
                collapsed ?
                <MenuFoldOutlined  />
                :
                <MenuUnfoldOutlined />
            }
        </div>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setCollapse: data => {
        dispatch(setCollapse(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);