import {
  Button,
  Card,
  Form,
  ImageUploader,
  Input,
  NavBar,
  Popover,
  Result,
  TextArea,
  Toast,
} from "antd-mobile";
import React, { useState, useLayoutEffect, RefObject, useEffect } from "react";
import { isWeChat } from "@/utils";
import "./index.less";
import InputPicker from "@/components/InputPicker";
import {
  AGE_OPTIONS,
  HEIGHT_OPTIONS,
  MARRIAGE_OPTIONS,
  SEX_OPTIONS,
} from "./constant";
import {
  uploadFileImg,
  deleteFileImg,
  getAreasMap,
  getJobs,
  entryUser,
} from "@/service";
import InputCascadePicker from "@/components/InputCascadePicker";
import lrz from "lrz";
import NavbarTitle from "@/components/NavbarTitle";

const maxCount = 9;
export default () => {

  const [options, setOptions] = useState<any>({
    sex: [SEX_OPTIONS],
    height: [HEIGHT_OPTIONS],
    age: [AGE_OPTIONS],
    marriageStatus: [MARRIAGE_OPTIONS],
  });

  const [remark, setRemark] = useState("");

  const [fileList, setFileList] = useState<any>([]);

  const [userForm] = Form.useForm();
  const [matchmakerForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [successNum, setSuccessNum] = useState(0);

  useEffect(() => {
    Promise.all([getAreasMap(), getJobs()]).then((res) => {
      setOptions({
        ...options,
        vocation: [
          res[1].map((item: any) => {
            return { label: item.name, value: item.id };
          }),
        ],
        city: res[0],
      });
    });
  }, []);
  const uploadImg = (file: any) => {
    return lrz(file, { quality: 0.5 }).then((res: any) => {
      return uploadFileImg(res.formData).then((res) => {
        return {
          url: res,
        };
      });
    });
  };

  const ImgChange = (fileList: any[]) => {
    setFileList(fileList);
  };

  const deleteImg = (file: any) => {
    return deleteFileImg({
      fileName: file.url,
    });
  };

  const submit = () => {
    userForm.validateFields().then((userValues: any) => {
      setLoading(true);
      const matchmakerValues = matchmakerForm.getFieldsValue();
      const {
        city,
        name,
        age,
        height,
        sex,
        marriageStatus,
        vocation,
        mobilePhone,
      } = userValues;
      if (fileList.length === 0) {
        Toast.show({
          icon: "fail",
          content: "请上传头像图片",
        });
        setLoading(false);
        return;
      }
      const params = {
        ...matchmakerValues,
        remark,
        name,
        age: age[0],
        height: height[0],
        sex: sex[0],
        marriageStatus: marriageStatus[0],
        vocation: vocation[0],
        cityId: city[1],
        areaId: city[2],
        provinceId: city[0],
        mobilePhone,
        personalImgs: fileList.map((item: any) => item.url),
      };
      entryUser(params)
        .then((res) => {
          setSuccessNum(successNum + 1);
          setRegisterSuccess(true);
          userForm.resetFields();
          matchmakerForm.resetFields();
          setRemark("");
          setFileList([]);
        })
        .then(() => {
          setLoading(false);
        });
    });
  };
  return (
    <div className="collect-user">
      <NavbarTitle title="线下相亲资料填写" back={null} />
      {registerSuccess ? (
        <Result
          status="success"
          title={`登记成功 +${successNum}`}
          description={
            <Button
              shape="rounded"
              block
              color="primary"
              onClick={() => setRegisterSuccess(false)}
              className="back-btn"
            >
              返回继续登记
            </Button>
          }
        />
      ) : (
        <>
          <ImageUploader
            style={{ "--gap-horizontal": "20px" }}
            value={fileList}
            onChange={ImgChange}
            upload={uploadImg}
            multiple
            columns={3}
            maxCount={maxCount}
            showUpload={fileList.length < maxCount}
            onCountExceed={(exceed) => {
              Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`);
            }}
            // onDelete={deleteImg}
            className={`image-uploader`}
            showFailed={false}
          >
            <div className="image-uploader-add-btn">
              <img src={require("@/assets/add.png")} />
              <img className="add-tip" src={require("@/assets/camarer.png")} />
            </div>
          </ImageUploader>

          <div className="form-content">
            <Card title="基本信息">
              <Form form={userForm} layout="horizontal">
                <Form.Item
                  name="city"
                  label="所在城市"
                  rules={[{ required: true }]}
                >
                  <InputCascadePicker
                    placeholder="请选择所在城市"
                    options={options.city || []}
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: "姓名不能为空" }]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
                  <InputPicker
                    placeholder="请选择性别"
                    columns={options.sex || []}
                  />
                </Form.Item>
                <Form.Item
                  name="height"
                  label="身高"
                  rules={[{ required: true }]}
                >
                  <InputPicker
                    placeholder="请选择身高"
                    columns={options.height || []}
                    // defaultValue={[170]}
                  />
                </Form.Item>
                <Form.Item name="age" label="年龄" rules={[{ required: true }]}>
                  <InputPicker
                    placeholder="请选择年龄"
                    columns={options.age || []}
                  />
                </Form.Item>
                <Form.Item
                  name="marriageStatus"
                  label="婚姻状况"
                  rules={[{ required: true }]}
                >
                  <InputPicker
                    placeholder="请选择婚姻状况"
                    columns={options.marriageStatus || []}
                  />
                </Form.Item>
                <Form.Item
                  name="vocation"
                  label="从事职业"
                  rules={[{ required: true }]}
                >
                  <InputPicker
                    placeholder="请选择职业"
                    columns={options.vocation || []}
                  />
                </Form.Item>
                <Form.Item
                  name="mobilePhone"
                  label="联系电话"
                  rules={[{ required: true }]}
                >
                  <Input
                    type="number"
                    placeholder="请输入联系电话"
                    maxLength={20}
                  />
                </Form.Item>
              </Form>
            </Card>
            <div className="divider" />
            <Card title="红娘信息">
              <Form form={matchmakerForm} layout="horizontal">
                <Form.Item name="matchmakerName" label="红娘姓名">
                  <Input placeholder="请输入红娘姓名" />
                </Form.Item>
                <Form.Item name="matchmakerMobile" label="红娘电话">
                  <Input
                    type="number"
                    placeholder="请输入红娘电话"
                    maxLength={20}
                  />
                </Form.Item>
              </Form>
            </Card>
            <div className="divider" />
            <Card title="备注/说明">
              <TextArea
                value={remark}
                onChange={setRemark}
                placeholder="请输入备注/说明"
                rows={2}
              />
            </Card>
            <Button
              className="submit"
              block
              shape="rounded"
              color="primary"
              size="large"
              onClick={submit}
              loading={loading}
            >
              提交审核
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
