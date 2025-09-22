A Vitejs 3.x + React18 + Antd4.x project template.

# Components Used

| Component         | Description                                                             | Official Site                                       |
| :---------------- | :---------------------------------------------------------------------- | :-------------------------------------------------- |
| vite              | vitejs framework                                                        | https://www.vitejs.net/                             |
| vite-plugin-pages | generate route by pages dir                                             | https://github.com/hannoeru/vite-plugin-pages       |
| antd              | antd UI                                                                 | https://ant-design.gitee.io/components/overview-cn/ |
| vite-plugin-imp   | vite dynamic load（FIXME: conflict with antd style，need to be fixed.）  | https://github.com/onebay/vite-plugin-imp           |
| rollup-plugin-visualizer   | Visualize and analyze your Rollup bundle to see which modules are taking up space  | https://github.com/btd/rollup-plugin-visualizer |


# Main Features

[X] 1. fast build(using vite);
[X] 2. generate route by pages dir；
[ ] 3. dynamic change antd UI theme；
[ ] 4. dynamic change locale；

# Get Started

1. install dependencies

```
yarn
```

2. start dev

```
yarn dev
```

3. build artifact

```
yarn build
```

# update npm dependencies

npm install -g npm-check-updates

```
ncu -u --timeout 120000
```

# 如何将glb转换为jsx
执行下面的命令，会将glb模型转换为jsx文件
https://github.com/pmndrs/gltfjsx
```bash
npx gltfjsx modal.glb --keepgroups --keepnames
```
