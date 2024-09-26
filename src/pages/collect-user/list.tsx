import {
  InfiniteScroll,
  Image,
  Avatar,
  Tag,
  Space,
  SearchBar,
  Button,
  ImageViewer,
} from "antd-mobile";
import React, { useState } from "react";
import {
  List as VirtualizedList,
  AutoSizer,
  WindowScroller,
} from "react-virtualized";
import { List } from "antd-mobile";
import { entryUserList } from "@/service";
import NavbarTitle from "@/components/NavbarTitle";
import "./list.less";
import { isWeChat } from "@/utils";

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [queryPage, setQueryPage] = useState({ pageNo: 1, pageSize: 10 });
  const [searchValue, setSearchValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [imgs, setImgs] = useState<any[]>([])

  const loadMore = async () => {
    const res = await entryUserList({...queryPage, name: searchValue});
    const { records, total } = res || {};
    setData((val) => [...val, ...records]);
    setHasMore(total > queryPage.pageNo * queryPage.pageSize);
    setQueryPage({ ...queryPage, pageNo: queryPage.pageNo + 1 });
  };

  const lookImgs = (imgs: any[]) => {
    if(!imgs?.length) return
    setVisible(true)
    setImgs(imgs)
  }

  function rowRenderer({ index, key, style }: any) {
    const item = data[index];
    if (!item) return;

    const avatar = item.personalImgs[0];

    const { sexName, age, mobilePhone, marriageStatusName, vocationName } =
      item;
    return (
      <List.Item
        key={key}
        style={style}
        prefix={
          <Avatar onClick={()=> lookImgs(item.personalImgs)} style={{ "--border-radius": "50%" }} src={avatar || ""} />
        }
        description={
          <>
            <div className="desc">
              {vocationName || "-"}・{marriageStatusName || "-"}
            </div>
          </>
        }
      >
        <Space align="center">
          {`${item.name}`} <Tag color="warning">{`${sexName}  ${age} `}</Tag>
          <span>{mobilePhone?.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</span>
        </Space>
      </List.Item>
    );
  }

  const doSearch = async () => {
    setData([])
    setQueryPage({ pageNo: 1, pageSize: 10 });
    setHasMore(true)
  };

  return (
    <div className="collect-user-list">
      <NavbarTitle title="线下相亲用户登记列表" back={null} />
      <div className={ `search ${isWeChat() ? "weChat-top" : ""}`}>
        <SearchBar value={searchValue} onChange={setSearchValue} placeholder="请输入登记姓名" />
        <Button size="small" color="primary" onClick={doSearch}>
          搜索
        </Button>
      </div>

      <WindowScroller >
        {({ height, scrollTop, isScrolling }: any) => (
          <List >
            <AutoSizer disableHeight>
              {({ width }: any) => (
                <VirtualizedList
                  autoHeight
                  rowCount={data.length}
                  rowRenderer={rowRenderer}
                  width={width}
                  height={height}
                  rowHeight={70}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                />
              )}
            </AutoSizer>
          </List>
        )}
      </WindowScroller>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      <ImageViewer.Multi
        images={imgs}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
    </div>
  );
};
