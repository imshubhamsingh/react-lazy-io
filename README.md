# 🥱 react-lazy-io

## 📖 Preface

Recently at my
[work](https://twitter.com/imshubhamsingh_/status/1437468156616855553), I was
trying to implement a simple lazy load. I ended up creating a simple, functional
component that uses Intersection Observer (Or Scroll Event for older browser) to
determine the visibility of images. In my original, implementation all the
elements were creating their Intersection Observer, which is fine as long as
there are limited elements. But to take it to the next level, a question arises:
What if I can use a single listener or observer for my Lazy loaded element. This
library is a simple approach toward using context to share a single observer
instance and using a lookup functionally, the Lazy items can be added and
deleted from the observer.

## 🧑🏻‍💻 Install

```
npm install react-lazy-io
```

or

```
yarn add react-lazy-io
```

## ⚛️ Components

### Lazy.Container

This components creates a context and uses it to store the newly created
Intersection observer. It takes props as:

- options: Intersection Observer Options

#### Example

```jsx
import React from 'react';
import { Lazy } from 'react-lazy-io';

function Component() {
  return (
    <Lazy.Container>
      {/** React children
            to be lazy loaded can be added here
      */}
    </Lazy.Container>
  );
}
```

### Lazy.Item

This components creates a DOM node and adds its reference to nearest
`Lazy.Container`. The children of this component will be shown depending on the
Container options.

#### Example

```jsx
import React from 'react';
import { Lazy } from 'react-lazy-io';
import imageData from './images.json';

function Component() {
  return (
    <Lazy.Container>
      {imageData.map((data) => (
        <Lazy.Item>
          <img
            key={data.id}
            src={data.url}
            width={data.width}
            height={data.height}
            alt={data.id}
          />
        </Lazy.Item>
      ))}
    </Lazy.Container>
  );
}
```

### Lazy.Placeholder

This components is used as a placeholder in `Lazy.Item` component. The
`Lazy.Item` component uses a slots based mechanism to determine when to show
placeholder and rest of children.

#### Example

```jsx
import React from 'react';
import { Lazy } from 'react-lazy-io';
import imageData from './images.json';

function Component() {
  return (
    <Lazy.Container>
      {imageData.map((data) => (
        <Lazy.Item>
          <Lazy.Placeholder
            className="placeholder"
            style={{ width: `${data.width}px`, height: `${data.height}px` }}
          />
          <img
            key={data.id}
            src={data.url}
            width={data.width}
            height={data.height}
            alt={data.id}
          />
        </Lazy.Item>
      ))}
    </Lazy.Container>
  );
}
```

### Lazy.Image

This components is a sweet lazy loaded image baked with simple transition. The
placeholder for the image is passed on as a child of it, in the form of
`Lazy.Placeholder`. It takes various props as:

- as: DOM node tag name
- height: Image height
- width: Image width
- src: Image src
- alt: Image alt
- transitionDuration: Image visibility transition value in seconds

#### Example

```jsx
import React from 'react';
import { Lazy } from 'react-lazy-io';
import imageData from './images.json';

function Component() {
  return (
    <Lazy.Container
      options={{
        rootMargin: '0px 0px 100px 0px',
      }}
    >
      {imageData.map((data) => (
        <Lazy.Image
          src={data.url}
          width={data.width}
          height={data.height}
          alt={data.id}
          transitionDuration={1.5}
        >
          <Lazy.Placeholder
            className="placeholder"
            style={{ width: `${data.width}px`, height: `${data.height}px` }}
          />
        </Lazy.Image>
      ))}
    </Lazy.Container>
  );
}
```

### Lazy.Suspense

Here I tried to combine Intersection Observer with React Suspense and lazy API
that will load Dynamic component when ever it is about to appear close to
browser viewport. The placeholder for the dynamic component is passed on as a
child of it, in the form of `Lazy.Placeholder` which is also passed as fallback
to Suspense

#### Example

```jsx
import React from 'react';
import { Lazy } from 'react-lazy-io';
const MyAwesomeComponent = React.lazy(() => import('./MyAwesomeComponent'));

function Component() {
  return (
    <Lazy.Container
      options={{
        rootMargin: '0px 0px 100px 0px',
      }}
    >
      <Lazy.Suspense>
        <Lazy.Placeholder className="placeholder" />
        <MyAwesomeComponent />
      </Lazy.Suspense>
    </Lazy.Container>
  );
}
```

## 🪝 Hooks

### useLazyItem

This is a hooks for for `Lazy.Item` component for more granular control of DOM
node. It returns 2 values:

- ref: Reference to the DOM node.
- visibile: If the ref node is visible based on options provided to container.

```jsx
import React from 'react';
import { Lazy, useLazyItem } from 'react-lazy-io';


function CustomItem() {
    const {visible, ref} = useLazyItem();
    return <div ref={ref}>{visible? : "I was visibile": "I'm not visible"}</div>
}

function Component(){
  return (
    <Lazy.Container>
        Testing hooks
        <CustomItem />
    </Lazy.Container>
  );
};
```

## Features

- 💫 Compound Component structure
- 🌳 Tree-shakeable
- 💥 [Tiny bundle](https://bundlephobia.com/package/react-lazy-io) ~1.6 kB
  gzipped
- 🖥 SSR friendly

## 📟 Polyfill

As the library depends on Intersection Observer web API which is almost
supported by all modern browser. But if in case you have some application for
older browser especially <= IE11, then I would suggest to also import a
[intersection-observers](https://www.npmjs.com/package/intersection-observer)
side effect into your project.

```jsx
// import the polyfill before using this library.
import 'intersection-observer';
```

## ✍️ Author

[@imshubhamsingh\_](https://twitter.com/imshubhamsingh_)

P.S. This is my first time creating a fully typed library. I learnt a lot here.
Maybe in coming days will share my learning via a blog.

## 🗂 TODO

- [x] Create Intersection Observer Component and its child components
- [x] Explore `Lazy.Image` component
- [x] SSR friendly
- [x] Explore `Lazy.Suspense` component
- [ ] Add tests - I guess to lazy to write it.
