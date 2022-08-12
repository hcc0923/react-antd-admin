import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { deleteTag } from "@/store/actions/tag";

const TagView = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { tag, deleteTag } = props;

  const onCloseTag = (item) => {
    const tagLength = tag.length;
    if (pathname === item.key && item.key === tag[tagLength - 1].key) {
      navigate(tag[tagLength - 2].key);
    }
    if (pathname === item.key && item.key !== tag[tagLength - 1].key) {
      const tagIndex = tag.findIndex((tagItem) => tagItem.key === item.key);
      navigate(tag[tagIndex + 1].key);
    }
    deleteTag(item);
  };
  const onClickTag = (item) => {
    navigate(item.key);
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
          <span onClick={() => onClickTag(item)} className="cursor-pointer">
            {item.label}
          </span>
        </Tag>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  deleteTag: (data) => {
    dispatch(deleteTag(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TagView);
