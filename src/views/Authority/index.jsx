import React, { useState } from "react";
import { Card, Select, Image, Empty } from "antd";
import logo from "@/assets/images/logo.svg";
import vite from "@/assets/images/vite.svg";

const Authority = () => {
  const roleMap = { 1: "用户", 2: "管理员", 3: "超级管理员" };
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [authority, setAuthority] = useState(userInfo.role);

  const onSelectChange = (value) => {
    setAuthority(value);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, role: value })
    );
    window.location.reload();
  };

  return (
    <Card title="权限切换">
      <div className="flex flex-col items-center">
        <div>
          你当前的权限是：
          <span className="text-sm font-bold">
            {roleMap[authority]}
          </span>
        </div>
        <div className="mt-8">
          <Select
            className="w-32"
            defaultValue={authority}
            onChange={onSelectChange}
          >
            <Select.Option value={1}>用户</Select.Option>
            <Select.Option value={2}>管理员</Select.Option>
            <Select.Option value={3}>超级管理员</Select.Option>
          </Select>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        {authority > 2 ? (
          <>
            <Image alt="logo" width={400} height={500} src={logo} />
            <Image alt="logo" width={400} height={500} src={vite} />
          </>
        ) : authority > 1 ? (
          <Image alt="logo" width={400} height={500} src={logo} />
        ) : (
          <Empty description={false} imageStyle={{ width: 400, height: 500 }} />
        )}
      </div>
    </Card>
  );
};

export default Authority;
