# Wedding Register APIs

### Requirements
1. npm

### How it work
1. npm install
3. npm start

### Methods
1. GET
```curl localhost:8080/api/attendee```

2. POST
```curl -H "Content-Type: application/json" -X POST -d '{"name":"mimi lo", "relation": 1}' http://localhost:8080/api/attendee```

3. DELETE
```curl -X DELETE localhost:8080/api/attendee/:id```
