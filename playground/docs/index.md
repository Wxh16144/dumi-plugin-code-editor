---
title: dumi-plugin-code-editor
---

## Demo

### js

```js
import { defineConfig } from 'dumi';

// more config: https://d.umijs.org/config
export default defineConfig({
  plugins: [
    // https://github.com/Wxh16144/dumi-plugin-code-editor
    'dumi-plugin-code-editor',
  ],
  // more
});
```

### ts

```ts
const foo: string = 'bar';
console.log(foo);
```

### jsx

```jsx
import React from 'react';

const App = () => {
  return <div>hello, dumi-plugin-code-editor</div>;
};

export default App;
```

### tsx

```tsx
import React from 'react';

const App: React.FC = () => {
  return <div>hello, dumi-plugin-code-editor</div>;
};

export default App;
```

---

## Source Code

> use [dumi-plugin-code-snippets](https://github.com/Wxh16144/dumi-plugin-code-snippets) to display source code

<<< @/docs/index.md
