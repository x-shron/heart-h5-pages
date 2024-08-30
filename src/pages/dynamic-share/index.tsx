import "./index.less";
import { useSearchParams } from "umi";
import { Avatar, Button, Grid, Space, Tag } from "antd-mobile";
import { useEffect, useState } from "react";
import { getDynamicDetail } from "@/service";

// 0-登录(在线) 1-离线：2-刚刚在线 3-昨天在线
const statusMap: any = {
  0: {
    text: "在线",
    color: "success",
  },
  1: {
    text: "离线",
    color: "#C4C4C4",
  },
  2: {
    text: "刚刚在线",
    color: "#ffdb65",
  },
  3: {
    text: "昨天在线",
    color: "#C4C4C4",
  },
};

export default () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const [detail, setDetail] = useState<any>({});

  const {
    nickName,
    city,
    area,
    headImg,
    imageList,
    tagList,
    vocationName,
    status,
    sex, //0:男 1:女
    age,
    content,
  } = detail || {};

  useEffect(() => {
    if (id) {
      getDynamicDetail(id).then((res) => {
        setDetail(res);
      });
    }
  }, [id]);

  const downloadApp = () => {
    const iosUrl = "https://itunes.apple.com/cn/app/id455611831";
    const androidUrl = "";
    if (navigator.userAgent.includes("iPhone")) {
      window.open(iosUrl);
    } else if (navigator.userAgent.includes("Android")) {
      window.location.href = androidUrl;
    }
  };

  return (
    <div className="dynamic-share">
      <div className="top-fix-tip">聊天交友，就用联线心动！</div>
      <div className="share-info-user">
        <Avatar src={headImg} />
        <div className="info">
          <div className="title">
            {nickName || "--"}
            <Tag round color="#FAC8FF">
              {sex === 0 ? "男" : "女"}
              {age}
            </Tag>
            <Tag round color={statusMap[status]?.color}>
              {statusMap[status]?.text || "--"}
            </Tag>
          </div>
          <div className="desc">
            <div>
              {city}・{area}・{vocationName}
            </div>
            <Space>
              {tagList?.map((item: any) => <span key={item}>{item}</span>)}
            </Space>
          </div>
        </div>
      </div>
      <div className="share-info-text-content">
        <pre
          style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", margin: 0 }}
        >{`${content}`}</pre>
      </div>
      <div className="share-info-content-img">
        <Grid columns={3} gap={8}>
          {imageList?.map((item: any) => (
            <Grid.Item key={item}>
              <div className="img-item">
                <img src={item} />
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </div>

      <div className="share-info-view-more">
        <img className="modal-bg" src={require("@/assets/modal-bg.png")} />
        <Button className="more-btn" shape="rounded" color="primary">
          查看更多动态
        </Button>
      </div>

      <div className="bottom-fix-wrap">
        <div className="bottom-download">
          <div className="bottom-logo">
            <img src={require("@/assets/app-logo.png")} />
            <div>
              <div className="title">联线心动</div>
              <div className="desc">聊天交友，就用联线心动！</div>
            </div>
          </div>
          <Button onClick={downloadApp} shape="rounded" color="primary">
            免费下载
          </Button>
        </div>
      </div>
    </div>
  );
};
