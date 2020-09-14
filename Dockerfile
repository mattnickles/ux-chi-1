FROM node:dubnium-stretch

ENV BABEL_DISABLE_CACHE=1

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

RUN mkdir -p /lux
WORKDIR /lux

RUN wget https://www.slimjet.com/chrome/download-chrome.php?file=files%2F71.0.3578.80%2Fgoogle-chrome-stable_current_amd64.deb -O google-chrome-stable_current_amd64.deb \
 && apt-get update \
 && apt-get install -y ./google-chrome-stable_current_amd64.deb expect libgconf-2-4 xvfb busybox \
 && apt-get clean \
 && rm ./google-chrome-stable_current_amd64.deb

RUN mkdir /tmp/{lux,custom-elements}
COPY package_lux.json /tmp/lux/package.json
COPY package_custom-elements.json /tmp/custom-elements/package.json

RUN  cd /tmp/lux \
 && yarn install \
 && cd /tmp/custom-elements \
 && yarn install \
 && yarn cache clean

COPY entrypoint.sh /
ENTRYPOINT ["/tini", "--", "/entrypoint.sh"]
