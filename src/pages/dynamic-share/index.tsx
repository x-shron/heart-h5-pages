import "./index.less";
import { useSearchParams } from "umi";
import { Avatar, Button, Grid, Space, Tag } from "antd-mobile";

export default () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="dynamic-share">
      <div className="top-fix-tip">聊天交友，就用联线心动！</div>

      <div className="share-info-user">
        <Avatar
          style={{ "--size": "52px" }}
          src={require("@/assets/miner.png")}
        />
        <div className="info">
          <div className="title">
            公子世无双
            <Tag round color="#FAC8FF">
              25
            </Tag>
            <Tag round color="#ffdb65">
              刚刚在线
            </Tag>
          </div>
          <div className="desc">
            <div>江北区・公司职员</div>
            <Space>
              <span>兴趣爱好</span>
              <span>徒步</span>
              <span>美食</span>
              <span>没事</span>
            </Space>
          </div>
        </div>
      </div>
      <div className="share-info-content-img">
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="img-item">
              <img src={require("@/assets/img2.jpg")} />
            </div>
          </Grid.Item>
         
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
          <Button shape="rounded" color="primary">
            免费下载
          </Button>
        </div>
      </div>
    </div>
  );
};
