// handler for chunk error after deploy, we should force refresh the browser to getting new assets(js, css, etc)
export default function loader(lazyComponent: any) {
  return new Promise((resolve, _) => {
    lazyComponent.then(resolve).catch(() => {
      window.location.reload();
    });
  });
}