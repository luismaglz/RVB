# Dockerfile extending the generic Node image with application files for a
# single application.
FROM gcr.io/google_appengine/nodejs
COPY dist /app/
COPY .angular-cli.json /app/
COPY package-lock.json /app/
COPY package.json /app/
COPY server.js /app/
COPY server /app/
COPY src /app/
COPY app.yaml /app/

# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)
RUN npm install -g @angular/cli
CMD npm start
