# react-focal-point

> React component that does that masking for tutorial / walkthrough with multiple focus points.

[![NPM](https://img.shields.io/npm/v/react-focal-point.svg)](https://www.npmjs.com/package/react-focal-point) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-focal-point
```

## Usage

```jsx
import React from 'react'

import FocalPoint from 'react-focal-point'

class Example extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FocalPoint
          points={{
            key1: '.p1',
            key2: '.p2',
          }}
        />
        <pre className="p1">
          Amet est labore non nisi nulla ullamco dolor exercitation cupidatat ad
          excepteur commodo ut. Non fugiat ipsum amet ullamco irure ullamco
          ullamco cillum. Enim labore minim adipisicing laboris minim amet anim
          esse consectetur esse laborum Lorem dolor excepteur. Pariatur elit non
          sit non aliquip irure est.
        </pre>
        <pre className="p2">
          Et irure aute et consequat eu laborum exercitation. Amet elit dolore
          magna proident occaecat duis duis dolore eiusmod adipisicing. Ullamco
          fugiat Lorem magna et fugiat voluptate minim duis cillum cupidatat
          consectetur mollit. Ullamco duis culpa sit ipsum elit est labore id
          labore aute voluptate.
        </pre>
      </React.Fragment>
    )
  }
}
```

## License

MIT © [smiled0g](https://github.com/smiled0g)
