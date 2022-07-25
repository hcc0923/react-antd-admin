import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { 
    MenuFoldOutlined, 
    MenuUnfoldOutlined, 
    TranslationOutlined, 
    CheckOutlined, 
    CloseOutlined 
} from '@ant-design/icons';
import { setCollapse } from "@/store/actions/setting";

const Hamburger = (props) => {
    const { collapse, setCollapse } = props;
    console.log(collapse);
    return (
        <div 
            className="flex items-center justify-start text-2xl -ml-8" 
            onClick={() => setCollapse({ collapsed: !collapse.collapsed })}
        >
            {
                collapse.collapsed ?
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