import { useEffect, useState } from 'react';

export enum ImageDownloadStatus {
  processing,
  finished,
}

const useAddBase64Url = () => {
  const [downloadStatuses, setDownloadingStatus] = useState<
    ImageDownloadStatus[]
  >([]);

  const updateStatus = (index: number, status: ImageDownloadStatus) => {
    const newArr = downloadStatuses.concat([]);
    newArr[index] = status;
    setDownloadingStatus(newArr);
  };
  /**
   * 将 base64URL 提前植入 node 的 base64 属性中
   * @param node Img 节点
   * @param index 下载的序号
   */
  const setBase64Url = (node: HTMLImageElement, index: number) => {
    fetch(node.src).then((data) => {
      data.blob().then((blob) => {
        // 至关重要
        const oFileReader = new FileReader();
        oFileReader.readAsDataURL(blob);

        oFileReader.onloadend = (e) => {
          // 此处拿到的已经是 base64的图片了
          const base64 = e.target?.result as string;
          updateStatus(index, ImageDownloadStatus.finished);
          node.setAttribute('base64', base64);
        };
      });
    });
  };

  useEffect(() => {
    // 1 找到所有包含图片的节点
    const imageNodes = document.getElementsByTagName('IMG');

    // 针对这些节点添加相应的按钮
    Array.from(imageNodes).forEach((node, index) => {
      // 如果是外部 URL 需要等待完成加载解析
      const { src } = node as HTMLImageElement;
      if (src.startsWith('http')) {
        updateStatus(index, ImageDownloadStatus.processing);
        setBase64Url(node as HTMLImageElement, index);
      }
    });
  }, []);

  return {
    downloadStatuses,
    isFinished: !downloadStatuses.includes(ImageDownloadStatus.processing),
  };
};
export default useAddBase64Url;
