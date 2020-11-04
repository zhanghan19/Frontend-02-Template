学习笔记

#问题

```js
// 为什么老师使用open打开而我却不行 需要使用start
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.f1ef0ae6f95002ea`)

child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.f1ef0ae6f95002ea`)
```



获取用户信息是User-Agent传了为啥还抱User-Agent找不到

```js
heaeders: {
      "Authorization": `token ${token}`,
      "User-Agent": "toy-publish01"
    }
```

