Creating of dwidget:
```bash
cd widgets
pnpm dlx tiged etherean-app/dwidget/packages/template-dwidget lido # use --mode=git for private repo
```

Creating of dapp:
```bash
cd dapps
pnpm dlx tiged etherean-app/dwidget/packages/template-dapp lido # use --mode=git for private repo
```

test grpc:
```bash
grpcurl -plaintext -import-path ./src/proto -proto etherean.proto -d '{"user_wallet": "0x5235894c27b23E466027c7C39A90820327B7c65d", "limit": 2}' '192.168.1.49:50051' etherean.EthereanGrpc/GetLidoRewards
```