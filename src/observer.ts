type IGenerateObserver = {
  options: IntersectionObserverInit;
};

export type IObserverCallback = (
  inViewPort: boolean,
  entry: IntersectionObserverEntry,
) => void;

export type INodes = Map<Element, Array<IObserverCallback>>;

type IObserver = {
  callback: IObserverCallback;
  node: Element;
  nodes: INodes;
  observer: IntersectionObserver;
};

export type Observer = {
  nodes: INodes;
  observer: IntersectionObserver;
};

export function generateObserver({ options }: IGenerateObserver): Observer {
  const nodes: INodes = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const inViewport = entry.isIntersecting;

      nodes.get(entry.target)?.forEach((callback) => {
        callback(inViewport, entry);
      });
    });
  }, options);
  return { nodes, observer };
}

export function observer({ node, nodes, callback, observer }: IObserver) {
  const ogCallbacks = nodes.get(node) || [];
  if (!nodes.has(node)) {
    nodes.set(node, ogCallbacks);
  }

  ogCallbacks.push(callback);

  observer.observe(node);

  return function removeObserver() {
    ogCallbacks.splice(ogCallbacks.indexOf(callback), 1);

    if (ogCallbacks.length === 0) {
      nodes.delete(node);
      observer.unobserve(node);
    }
    if (nodes.size === 0) {
      observer.disconnect();
    }
  };
}
