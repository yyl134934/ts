## Routes
Based on the example db.json, you'll get the following routes:

>GET    /posts
>GET    /posts/:id
>POST   /posts
>PUT    /posts/:id
>PATCH  /posts/:id
>DELETE /posts/:id

## Same for comments
> GET   /profile
> PUT   /profile
> PATCH /profile

## Params
### Conditions
> → ==
> lt → <
> lte → <=
> gt → >
> gte → >=
> ne → !=

```
GET /posts?views_gt=9000
```

### Range
> start
> end
> limit

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate
> page
> per_page (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort
- _sort=f1,f2

```
GET /posts?_sort=id,-views
```

### Nested and array fields
- x.y.z...
- x.y.z[i]...

```
GET /foo?a.b=bar
GET /foo?x.y_lt=100
GET /foo?arr[0]=bar
```




### Embed
```
GET /posts?_embed=comments
GET /comments?_embed=post
```


## Delete
```
DELETE /posts/1
DELETE /posts/1?_dependent=comments
```



## Serving static files
If you create a ./public directory, JSON Serve will serve its content in addition to the REST API.

You can also add custom directories using -s/--static option.

json-server -s ./static
json-server -s ./static -s ./node_modules