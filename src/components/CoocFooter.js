import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const CoocFooter = () => {
  return (
    <div className="h-200 block items-center justify-around bg-gray-100 p-4 md:flex">
      <div>
        <p className="cooc-footer-text text-sm">
          系統(v0.0.2)提供：宜眾資訊（股）公司 2021 eZoom Information, Inc.
        </p>
        <span className="cooc-footer-text mr-2 text-sm">
          系統問題反應：聯絡電話：0963-525977
        </span>
        <div className="block md:inline">
          <span className="mr-2 text-sm text-cooc-primary">
            <a
              href="https://docs.google.com/document/d/1LKO6RsXFFw36ONt_NaiG0NpuXa6-4mlhdO__WHQ9-Cg/edit"
              target="_blank"
              rel="noreferrer"
            >
              常見問答
            </a>
          </span>
          <span className="text-sm text-cooc-primary">
            <a
              href="https://docs.google.com/presentation/d/1kdCtBc60fGzb5pI86PvlUDTSq3pSAl94/edit#slide=id.p1"
              target="_blank"
              rel="noreferrer"
            >
              教育訓練手冊
            </a>
          </span>
        </div>
      </div>
      <div className="h-[36px] w-[116px]">
        <a
          href="https://line.me/R/ti/p/%40150btdgj"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/lineAddFriend.png"
            height={72}
            width={232}
            alt={"Line"}
          />
        </a>
      </div>
    </div>
  );
};

CoocFooter.propTypes = {
  onClick: PropTypes.func,
};

CoocFooter.defaultProps = {
  onClick: undefined,
};
export default CoocFooter;
