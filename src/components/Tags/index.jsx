import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Tag, Tooltip, Space, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { closeTag, closeOtherTag, closeAllTag } from "@/store/actions/tag";

const TagView = (props) => {
  const { tag, closeTag, closeOtherTag, closeAllTag } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const intl = useIntl();
  const formatMessage = (id) => {
    return intl.formatMessage({ id });
  };
  const onClickTag = (item) => {
    navigate(item.key);
  };
  const onCloseTag = (item) => {
    const tagLength = tag.length;
    if (pathname === item.key && item.key === tag[tagLength - 1].key) {
      navigate(tag[tagLength - 2].key);
    }
    if (pathname === item.key && item.key !== tag[tagLength - 1].key) {
      const tagIndex = tag.findIndex((tagItem) => tagItem.key === item.key);
      navigate(tag[tagIndex + 1].key);
    }
    closeTag(item);
  };
  const onCloseOtherTag = (item) => {
    closeOtherTag(item);
  };
  const onCloseAllTag = () => {
    closeAllTag();
  };
  return (
    <div className="w-full pl-4 py-2" style={{ backgroundColor: "#fafafa" }}>
      {tag.map((item) => (
        <Tag
          key={item.key}
          closable={item.key !== "/home"}
          color={item.key === pathname ? "#1890ff" : ""}
          closeIcon={<CloseOutlined className="align-baseline" />}
          onClose={() => onCloseTag(item)}
          className="text-sm mb-2"
        >
          <Tooltip
            placement="bottom"
            title={
              <Space>
                <Button onClick={() => onCloseOtherTag(item)}>删除其他</Button>
                <Button onClick={onCloseAllTag}>删除所有</Button>
              </Space>
            }
          >
            <span onClick={() => onClickTag(item)} className="cursor-pointer">
              {formatMessage(item.label)}
            </span>
          </Tooltip>
        </Tag>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  closeTag: (data) => {
    dispatch(closeTag(data));
  },
  closeOtherTag: (data) => {
    dispatch(closeOtherTag(data));
  },
  closeAllTag: (data) => {
    dispatch(closeAllTag(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TagView);
