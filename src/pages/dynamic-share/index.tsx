import "./index.less";
import { useSearchParams } from "umi";
import { Button } from "antd-mobile";

export default () => {
  const [searchParams] = useSearchParams();
  console.log("-123", searchParams.get("a"));

  return (
    <div className="dynamic-share">
      <div className="top-fix-tip">聊天交友，就用联线心动！</div>
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
