How to run

```js

./aquilafcm

or

./aquilafcm -p="paht/to/serviceAccount.json"

```

How to send with restful API

```js

curl --location 'http://localhost:8080/send' \
--header 'Content-Type: application/json' \
--data '{
    "token": "pushKey",
    "data": {
        "key": "value",
        "click_action": "http://localhost:3000/",
        "title": "dev",
        "body": "dev",
        "imageUrl": "http://localhost:3000/logo192.png",
    }
}'
```
