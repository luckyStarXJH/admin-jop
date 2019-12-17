export function copyText(text: string) {
  return new Promise((resolve, reject) => {
    if (window.navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        resolve('复制成功');
      }).catch(() => {
        reject('复制失败');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('Copy');
      textArea.remove()
      resolve('复制成功');
    }
  })
}