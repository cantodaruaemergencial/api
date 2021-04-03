+ **heroku**
```bash
heroku login
heroku container login
heroku container:push web -a cantodaruaemergencial
heroku container:release web -a cantodaruaemergencial
```

+ **gcp**
```bash
docker build -t us-east1-docker.pkg.dev/cantodarua/repo/api:latest .
docker push us-east1-docker.pkg.dev/cantodarua/repo/api:latest
```